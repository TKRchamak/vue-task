<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="container">
          <div class="shadow mb-5 bg-body rounded">
            <h2
              class="ps-5 pt-2 pb-2 rounded-top"
              style="background-color: #dcdcdc"
            >
              Product
            </h2>
            <div v-for="pd in cartData" :key="pd.id">
              <div class="container row pt-3">
                <div class="col-md-3 mb-3">
                  <div class="text-center">
                    <img
                      :src="pd.image"
                      class="img-fluid rounded-start"
                      alt="img"
                    />
                  </div>
                  <div class="text-center">
                    <div class="">
                      <button
                        @click="addToDatabase(pd, 1)"
                        class="btn countBtn border me-2"
                      >
                        +
                      </button>
                      <span
                        style="
                          padding: 6px 14px 11px;
                          border-radius: 3px;
                          background-color: #fcd6aa;
                        "
                      >
                        {{ pd.quantity }}
                      </span>
                      <button
                        @click="addToDatabase(pd, -1)"
                        class="btn countBtn border ms-2"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-2 position-md-relative">
                  <div class="">
                    <h5 class="">iPhone 12 Pro Max</h5>
                    <p>Brand: <span>Apple</span></p>
                    <p>Gold, e-Sim, USA, 256GB</p>
                  </div>
                  <p class="position-md-absolute bottom-0">
                    Unit Price BDT {{ pd.charge }}
                  </p>
                </div>
                <div class="col-md-3 mb-2 text-center">
                  <button
                    @click="removeData(pd.id)"
                    class="btn btn-danger mb-5"
                  >
                    Delete
                  </button>
                  <h5>BDT 113500</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-md-4 shadow mb-5 bg-body rounded"
        style="background-color: #f7f7f7"
      >
        <div class="container">
          <div class="mb-5">
            <div class="text-center pb-5">
              <h3>Your Cart ({{ totalQuantity }})</h3>
              <small>Start adding items to your cart</small>
            </div>
            <h4>Price Details</h4>
            <hr />
            <div class="d-flex justify-content-between">
              <strong>Total Product Price</strong>
              <p>{{ totalCost }}</p>
            </div>
            <div
              class="d-flex justify-content-between"
              style="borderbottom: 2px dotted gray"
            >
              <strong>Delivery Charges</strong>
              <p>(will be added)</p>
            </div>
            <div class="d-flex justify-content-between">
              <strong>Total Amount</strong>
              <p>{{ totalCost }}</p>
            </div>
          </div>
          <div class="text-center pb-5">
            <button class="bigBtn" @click="processOrder">
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Cart",

  data() {
    return {
      totalCost: 0,
      totalQuantity: 0,
    };
  },
  created() {
    let data = this.getData();
    this.$store.state.cartData = data; //check leter
    let cartSelectedData = Object.values(data);
    this.totalPrice(cartSelectedData);
    this.totalProductQuantity(cartSelectedData);
  },
  methods: {
    ...mapMutations(["processOrder"]),
    increase(id) {
      let currentPro = cartSelectedData.filter((p) => p.id === product.id);
    },
    getData() {
      const data = localStorage.getItem("user") || "{}";
      return JSON.parse(data);
    },
    addToDatabase(product, quantity) {
      const currentCart = this.getData();
      const curCartValue = Object.values(currentCart);
      // console.log(curCartValue);
      const count = curCartValue.filter((p) => p.id === product.id);
      if (count[0]?.quantity > 0) {
        // console.log(count[0]?.quantity);
        quantity = count[0]?.quantity + quantity;
        // console.log(quantity);
        product["quantity"] = quantity;
        currentCart[product.id] = product;
        localStorage.setItem("user", JSON.stringify(currentCart));
      } else {
        product["quantity"] = quantity;
        currentCart[product.id] = product;
        localStorage.setItem("user", JSON.stringify(currentCart));
      }
    },
    removeData(key) {
      const currentCart = this.getData();
      delete currentCart[key];
      localStorage.setItem("user", JSON.stringify(currentCart));
    },
    totalPrice(value) {
      const total = value.reduce(
        (sum, event) => sum + event.charge * event.quantity,
        0
      );
      this.totalCost = total;
    },
    totalProductQuantity(value) {
      const total = value.reduce((sum, event) => sum + event.quantity, 0);
      this.totalQuantity = total;
    },
  },

  //data call from store
  computed: {
    ...mapState(["cartData"]),
  },
};
</script>

<style scoped>
.bigBtn {
  width: 45%;
  padding: 8px 0;
  border: 2px solid #f79637;
  background-color: white;
  border-radius: 26px;
  font-size: 25px;
  font-weight: 800;
  margin: 5px;
}
.bigBtn.active {
  border: 2px solid #f79637;
  background-color: #f79637;
  color: white;
}
</style>
