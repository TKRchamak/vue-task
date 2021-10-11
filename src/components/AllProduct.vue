<template>
  <div class="container">
    <div class="card mb-3 mt-3 border-0">
      <div class="row g-0">
        <div class="col-md-5">
          <img
            :src="selectProduct.image"
            class="img-fluid rounded-start"
            alt="img"
          />
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <img
              src="../assets/Apple_1.svg"
              class="img-fluid rounded-start"
              alt="img"
              style="max-width: 70px"
            />
            <h2>iPhone 12 Pro Max</h2>
            <h4 style="color: #808080">TK.{{ selectProduct.charge }}</h4>

            <label style="color: #808080" for="emi"
              ><input type="checkbox" name="" id="emi" /> Available EMI Offer
              <span style="color: #f79637">View Plans</span></label
            >
            <hr />
            <div>
              <div
                v-for="(type, index) in productType"
                :key="index"
                class="row p-2"
              >
                <div class="col-md-3 mb-2">
                  <strong> {{ Object.keys(type)[0] }}:</strong>
                </div>
                <div v-if="type.Storage" class="col-md-9">
                  <button
                    @click="changeStorageCode(store.id)"
                    v-for="store in type.Storage"
                    :key="store.id"
                    class="me-2 borderStyle"
                    :id="store.id"
                  >
                    {{ store.value }}
                  </button>
                </div>
                <div v-if="type.Color" class="col-md-9">
                  <div
                    v-for="c in type.Color"
                    :key="c.id"
                    class="btn"
                    :id="c.id"
                  >
                    <button
                      v-if="c.id === 3483"
                      style="background-color: #fdeed7"
                      class="circle"
                      @click="changeColorCode(c.id)"
                    ></button>
                    <button
                      v-if="c.id === 3484"
                      style="background-color: #314b56"
                      class="circle me-2"
                      @click="changeColorCode(c.id)"
                    ></button>
                    <button
                      v-if="c.id === 3485"
                      style="background-color: #4a4946"
                      class="circle me-2"
                      @click="changeColorCode(c.id)"
                    ></button>
                    <button
                      v-if="c.id === 3486"
                      style="background-color: #f1f1ec"
                      class="circle me-2"
                      @click="changeColorCode(c.id)"
                    ></button>
                  </div>
                </div>
                <div v-if="type.Sim" class="col -md-9">
                  <button
                    v-for="s in type.Sim"
                    :key="s.id"
                    class="borderStyle me-2"
                    :id="s.id"
                    @click="changeSimCode(s.id)"
                  >
                    {{ s.value }}
                  </button>
                </div>
                <div v-if="type.Region" class="col-md-9">
                  <button
                    v-for="r in type.Region"
                    :key="r.id"
                    class="borderStyle me-2"
                    :id="r.id"
                    @click="changeRegionCode(r.id)"
                  >
                    {{ r.value }}
                  </button>
                </div>
              </div>
            </div>
            <div v-if="selectProduct.stock !== 0" :class="disable">
              <div class="row p-2">
                <div class="col-md-3 mb-2">
                  <strong>Quantity:</strong>
                </div>
                <div class="col-md-9">
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
                  <!-- <input
                    class="border"
                    style="
                      width: 40px;
                      padding: 5px 0 9px 0;
                      text-align: right;
                      border-radius: 3px;
                      background-color: #fcd6aa;
                    "
                    type="number"
                    :value="quantity"
                    @blur="update(value)"
                  /> -->
                  <button @click="decrease()" class="btn countBtn border ms-2">
                    -
                  </button>
                </div>
              </div>
              <div class="row p-2">
                <button
                  @click="addToDatabase(selectProduct, quantity)"
                  class="col-6 bigBtn active"
                >
                  Add To Cart
                </button>
                <button class="col-6 bigBtn">Buy Now</button>
              </div>
            </div>
            <div
              v-if="selectProduct.stock === 0"
              :class="disable"
              class="mt-2 p-2"
            >
              <h4 class="textStyle blod">Product stock out</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AllProduct",
  created() {
    this.getPosts();
    this.getPosts2();
  },
  data() {
    return {
      products: [],
      productType: [],
      selectedCatagory: [3482, 3486, 3487, 3490],
      selectProduct: {},
      quantity: 1,
      cartData: {},
    };
  },
  methods: {
    getPosts() {
      axios
        .get(
          "https://raw.githubusercontent.com/qtecsolution/Sample-JSON/main/variation.json"
        )
        .then((res) => {
          //   console.log(res.data);
          this.products = res.data;
          this.selectProduct = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPosts2() {
      axios
        .get(
          "https://raw.githubusercontent.com/qtecsolution/Sample-JSON/main/combination.json"
        )
        .then((res) => {
          //   console.log(res.data);
          this.productType = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findItem() {
      let item = this.products.find(
        (pd) =>
          pd.attribute_combination.toString() ===
          this.selectedCatagory.toString()
      );
      console.log(item);
      this.selectProduct = item;
    },
    changeStorageCode(code) {
      this.selectedCatagory.splice(0, 1, code);
      this.findItem();
    },
    changeColorCode(code) {
      this.selectedCatagory.splice(1, 1, code);
      this.findItem();
    },
    changeSimCode(code) {
      this.selectedCatagory.splice(2, 1, code);
      this.findItem();
    },
    changeRegionCode(code) {
      this.selectedCatagory.splice(3, 1, code);
      this.findItem();
    },
    update(value) {
      if (this.selectProduct.stock < value) {
        this.quantity = this.selectProduct.stock;
      } else {
        this.quantity = value;
      }
    },
    increase() {
      if (this.selectProduct.stock > this.quantity) {
        this.quantity = this.quantity + 1;
      } else {
        this.quantity = this.selectProduct.stock;
      }
    },
    decrease() {
      if (this.quantity > 1) {
        this.quantity = this.quantity - 1;
      } else {
        this.quantity = 1;
      }
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

    changeColor(value) {
      const code = value.split("_")[1];
      const colorCode = `# ${code}`;
      console.log(colorCode);
      return colorCode;
    },
    //      const addToCard = (pd) => {

    //     const count = (cart.filter((p) => p._id === pd._id))
    //     if (count[0]?.quantity > 0) {
    //         let index = cart.indexOf(pd);
    //         cart.splice(index, 1);
    //         pd.quantity = count[0]?.quantity + 1;
    //         let addPd = [...cart, pd];
    //         setCart(addPd);
    //         addToDatabaseCart(pd._id, pd.quantity)
    //     } else {
    //         pd.quantity = 1;
    //         let addPd = [...cart, pd];
    //         setCart(addPd);
    //         addToDatabaseCart(pd._id, pd.quantity)
    //     }

    // }
  },
};
</script>

<style scoped>
.circle {
  height: 35px;
  width: 35px;
  border: 4px double #353535;
  border-radius: 50%;
  display: inline-block;
}

.borderStyle {
  width: 80px;
  height: 30px;
  border: 1px solid #353535;
  background-color: white;
  border-radius: 16px;
}

.borderStyle:hover {
  border: 1px solid #f79637;
}
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
.textStyle {
  color: #f79637;
}
.countBtn {
  background-color: #fdeed7;
}
</style>
