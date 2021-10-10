import { createStore } from 'vuex'

export default createStore({
    state: {
        cartData: [],
        totalCost: 0,
        totalQuantity: 0,
    },
    getters: {

    },
    mutations: {
        totalPrice(state, value) {
            state.totalCost = value.reduce((sum, event) => sum + event.charge * event.quantity, 0)
        },
        processOrder(state) {
            localStorage.removeItem("user");
        },
    },
    actions: {},
    modules: {}
})