<template>
  <div class="container">
    <div class="row">
      <div class="col-8 border-end">
        <div v-for="pd in cartData" :key="pd.id" class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src=pd.image class="img-fluid rounded-start" alt="img" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <small class="text-muted"></small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
          <h3 class="text-center">Your Cart</h3>
          <h4>Price Details</h4>
          <hr>
          <div class="d-flex justify-content-between">
                <strong>Total Product Price</strong>
                <p>{{ totalCost }}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Cart",

  data() {
    return {
      cartData: [],
      totalCost: 0,
    };
  },
  created() {
    let data = this.getData();
    let cartSelectedData = Object.values(data)
    this.cartData = data;
    this.totalPrice(cartSelectedData)
  },
  methods: {
    getData() {
      const data = localStorage.getItem("user") || "{}";
      return JSON.parse(data);
    },
    removeData(key) {
      const currentCart = this.getData();
      delete currentCart[key];
      localStorage.setItem("user", JSON.stringify(currentCart));
    },
    processOrder() {
      localStorage.removeItem(this.getData());
    },
    totalPrice(value) {
        const total = value.reduce((sum, event) => sum+event.charge*event.quantity , 0)
        this.totalCost = total;
    }

  },
};
</script>

<style scoped></style>
