<template>
  <div class="add_button">
    <section class="subtrac_contain">
      <svg class="minus_icon svg_icon" @click="removeCart" v-if="foodNum > 0">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#cart-minus"
        ></use>
      </svg>
    </section>
    <span class="food_number" v-if="foodNum > 0">{{ foodNum }}</span>
    <section class="add_contain">
      <svg
        class="add_icon svg_icon"
        @click="addToCart"
        v-if="!(Foodfood.length > 1)"
      >
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#cart-add"
        ></use>
      </svg>
      <div class="specification_contain" v-else @click="showSpeci">
        <span>选规格</span>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['Foodfood', 'categroy_id'],
  created () {
    this.Foodspec = this.Foodfood[0]
  },
  data () {
    return {
      Foodspec: null,
      // 记录小圆点的相对于视口的位置

      showMoveDot: []

    }
  },
  computed: {
    ...mapState({
      cartList: (state) => state.shopCart.cartList
    }),
    foodNum () {
      const shopid = this.Foodspec.restaurant_id
      const categoryid = this.categroy_id
      const itemid = this.Foodspec.item_id
      const foodid = this.Foodspec.food_id
      if (
        this.cartList[shopid] &&
        this.cartList[shopid][categoryid] &&
        this.cartList[shopid][categoryid][itemid] &&
        this.cartList[shopid][categoryid][itemid][foodid]
      ) {
        return this.cartList[shopid][categoryid][itemid][foodid].num
      } else {
        return 0
      }
    }
  },
  methods: {
    // 加入购物车
    addToCart (e) {
      console.log('加入购物车')

      this.$store.commit({
        type: 'shopCart/AddCart',
        shopid: this.Foodspec.restaurant_id,
        categoryid: this.categroy_id,
        itemid: this.Foodspec.item_id,
        foodid: this.Foodspec.food_id,
        name: this.Foodspec.name,
        price: this.Foodspec.price,
        specs: this.Foodspec.specs,
        packingfee: this.Foodspec.packing_fee,
        skuid: this.Foodspec.sku_id,
        stock: this.Foodspec.stock
      })
      // 记录元素的大小及其相对于视口的位置
      const elLeft = e.target.getBoundingClientRect().left
      const elBottom = e.target.getBoundingClientRect().bottom
      this.showMoveDot.push(true)
      this.$emit('recordDot', {
        elLeft,
        elBottom,
        showMoveDot: this.showMoveDot
      })
    },
    // 移除购物车
    removeCart () {
      this.$store.commit({
        type: 'shopCart/RemoveCart',
        shopid: this.Foodspec.restaurant_id,
        categoryid: this.categroy_id,
        itemid: this.Foodspec.item_id,
        foodid: this.Foodspec.food_id,
        name: this.Foodspec.name,
        price: this.Foodspec.price,
        specs: this.Foodspec.specs,
        packingfee: this.Foodspec.packing_fee,
        skuid: this.Foodspec.sku_id,
        stock: this.Foodspec.stock
      })
    },
    showSpeci () {
      this.$emit('showSpeci', {
        food: this.Foodfood,
        categroy_id: this.categroy_id
      })
    },
    removeOutCart () { }
  }
}
</script>

<style lang="less" scoped>
@import "../style/mixins.less";
.add_button {
  display: inline-block;
  display: flex;
  font-size: 0.65rem;
  color: #666;
  .food_number {
    text-align: center;
    min-width: 1.5rem;
    color: #666;
    margin-right: 0.2rem;
  }
  .svg_icon {
    width: 0.9rem;
    height: 0.9rem;
    fill: #3190e8;
    vertical-align: middle;
    text-align: center;
    line-height: 0.9rem;
  }
  .specification_contain {
    background-color: @blue;
    border-radius: 0.2rem;
    span {
      color: #fff;
      font-size: 0.55rem;
      padding: 0.2rem;
      font-family: "Microsoft Yahei";
    }
  }
}
</style>
