import { getProducts } from "@/apis/productsApi/fetchProducts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    filteredProducts: [],
    filters: {
        category: null,
        brands: [],
        price: null
    },
    isLoading: false,
    isError: false,
    error: null
};


export const fetchProducts = createAsyncThunk('products/fetchProducts',
    async () => {
        const products = await getProducts();
        return products;
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterProducts: (state, action) => {
            const { category, brands, price } = action.payload;
            // let singleBrand = state.filters.brands.map(item => item);
            state.filteredProducts = state.products.filter(product => {
                const matchedCategory = category ? product.category === category : true;
                const matchedBrands = brands.length > 0 ? brands.includes(product.brand) : true;
                let matchedPrice = true;
                if(price === '>100') {
                    matchedPrice = product.price > 100;
                } else if(price === '<100') {
                    matchedPrice = product.price < 100;
                }
                return matchedCategory && matchedBrands && matchedPrice;
            })
            console.log("🚀 ~ filteredProducts.products:", state.filteredProducts);

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
    }

})

export const { filterProducts } = productsSlice.actions;
export default productsSlice.reducer;