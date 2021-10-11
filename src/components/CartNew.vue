<template>
  <div class="row">
    <div class="col-8 m-4">
      <div class="shadow mb-5 bg-body rounded">
        <h2 style="background-color: lightgray">Product</h2>
        <div v-for="pd in cartData" :key="pd.id">
          <div class="container row">
            <div class="col-md-4">
              <div class="text-center">
                  <img :src="pd.image" class="img-fluid rounded-start" alt="img" />
              </div>
              <div class="text-center">
                <div class="">
                  <button @click="increase()" class="btn countBtn border me-2">
                    +
                  </button>
                  <span
                    style="
                      padding: 6px 14px 11px;
                      border-radius: 3px;
                      background-color: #fcd6aa;
                    "
                  >
                    {{ quantity }}
                  </span>
                  <button @click="decrease()" class="btn countBtn border ms-2">
                    -
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="">
                <h5 class="">iPhone 12 Pro Max</h5>
                <p>Brand: <span>Apple</span></p>
                <p>Gold, e-Sim, USA, 256GB</p>
              </div>
              <p>Unit Price BDT {{ pd.charge }}</p>
            </div>
            <div class="col-md-4">
              <button @click="removeData(pd.id)" class="btn btn-danger">
                Delete
              </button>
              <h5>BDT 113500</h5>
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
      <button class="col-6 bigBtn active" @click="processOrder">Buy Now</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>