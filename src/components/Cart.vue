<template>
  <div class="container">
    <div class="row">
      <div class="col-8 border-end">
        <!-- <div v-for="pd in $store.state.cartData" :key="pd.id" class="card mb-3"> -->
        <div v-for="pd in cartData" :key="pd.id" class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="pd.image" class="img-fluid rounded-start" alt="img" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title">Selected Phone</h5>
                  <button @click="removeData(pd.id)" class="btn btn-danger">
                    Delete
                  </button>
                </div>
                <p class="card-text">Price : {{ pd.charge }}</p>
                <h4 class="card-text">Quantity : {{ pd.quantity }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="mb-5">
          <h3 class="text-center">Your Cart</h3>
          <h4>Price Details</h4>
          <hr />
          <div class="d-flex justify-content-between">
            <strong>Total Quantity</strong>
            <p>{{ totalQuantity }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <strong>Total Product Price</strong>
            <p>{{ totalCost }}</p>
          </div>
        </div>
        <button class="col-6 bigBtn active" @click="processOrder">
          Buy Now
        </button>
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
    getData() {
      const data = localStorage.getItem("user") || "{}";
      return JSON.parse(data);
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
