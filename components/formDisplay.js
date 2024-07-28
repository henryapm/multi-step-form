const { ref } = Vue; 

app.component('form-display', {
  props: {
    step: {
      type: Number,
      required: true
    }
  },
  template:
  /*html*/
  `
  <!-- <form @submit.prevent="onSubmit"> -->
    <section class="steps spaceBetween">
    <!-- Personal Information -->
      <section v-show="step === 0" class="step personal-info">
        <div class="description">
          <h1 class="title">Personal info</h1>
          <p class="p-description">Please provide your name, email address, and phone number.</p>
        </div>
        <div class="form flex-column">
          <label for="name">Name</label>
          <input type="text" name="name" v-model="personalInfo.name" id="name" placeholder="e.g. Stephen King" required>
          <label for="email">Email Address</label>
          <input type="email" name="email" v-model="personalInfo.email" id="email" placeholder="e.g. stephenking@lorem.com" required>
          <label for="phone">Phone Number</label>
          <input type="text" name="phone" v-model="personalInfo.phone" id="phone" placeholder="e.g. +1 234 567 890 " required>
        </div>
      </section>
      <!-- Select your plan -->
      <section v-show="step === 1" class="step">
        <div class="description">
          <h1 class="title">Select your plan </h1>
          <p class="p-description">You have the option of monthly or yearly billing.</p>
        </div>
        <section class="cards">
          <template v-for="(plan, index) in subscriptionPlan">
            <input type="radio" name="plan" :id="plan.name" :value="{id: index, price: getPriceOf(plan)}" class="radio-plan" v-model="selectedPlan" />
            <label :for="plan.name" class="card card-input">
              <img :src="plan.img" :alt="plan.name">
              <h2 class="plan">{{ plan.name }}</h2>
              <h2 class="price">{{ typeOfSubscription === 'monthly' ? '$' + plan.monthlyPrice : '$' + plan.yearlyPrice }}/<abbr v-if="typeOfSubscription === 'monthly'">mo</abbr><abbr v-else>yr</abbr></h2>
            </label>
          </template>
        </section>
        <div class="subscription flex-row">
          <div class="monthly">Monthly</div> 
          <label class="switch" for="type" @click=reset()>
            <input type="checkbox" id="type" v-model="typeOfSubscription" true-value="yearly" false-value="monthly">
            <span class="slider round"></span>
          </label>
          <div class="yearly">Yearly</div>
        </div>
      </section>
      <!-- Add ons -->
      <section v-show="step === 2" class="step">
        <div class="description">
          <h1 class="title">Pick add-ons</h1>
          <p class="p-description">Add-ons help enhance your gaming experience.</p>
        </div>
        <section class="add-on-plans flex">
        <template v-for="(addOn, index) in addOns">
          <label :for="getAddOnNamesArray(addOn.name)" class="add-on flex" :class="{checkSelected: isSelected(index)}">
            <div class="add-on-group flex">
              <div class="add-on-check">
                <input type="checkbox" name="add-on" :id="getAddOnNamesArray(addOn.name)" v-model="selectedProducts" :value="{ id: index, name: addOn.name, price: getPriceOf(addOn) }">
              </div>
              <div class="add-on-description">
                <h2 class="plan">{{ addOn.name }}</h2>
                <p class="add-on-description">{{ addOn.description }}</p>
              </div>
            </div>
            <div class="add-on-price">{{ getPriceOfFormated(addOn) }}</div>
          </label>
        </template>
        </section>
      </section>

      <!-- Finishing up -->
      <section v-if="step === 3" class="step">
        <div class="description">
          <h1 class="title">Finishing up</h1>
          <p class="p-description">Double-check everything looks OK before confirming.</p>
        </div>
        <div class="plan-selected">
          <div class="plan-group flex-row spaceBetween align-items-center">
            <div class="plan-description">
              <h2 class="plan">{{ subscriptionPlan[selectedPlan.id].name }}({{ typeOfSubscription }})</h2>
              <p class="secondary underline hover mt-7" @click="$emit('changeStep')">Change</p>
            </div>
            <div class="price">
              <h2 class="plan">{{ formatPrice(selectedPlan.price) }}</h2>
            </div>
          </div>
          <div>
            <template v-for="addOn in selectedProducts">
              <div class="flex-row spaceBetween pt-16">
                <div class="plan-description">
                  <p class="secondary">{{ addOn.name }}</p>
                </div>
                <div class="price">
                  <h2 class="secondary">{{ formatPrice(addOn.price) }}</h2>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="plan-description total m-24 flex-row spaceBetween align-items-center">
          <p class="secondary">Total (per {{ typeOfSubscription === 'monthly' ? 'month' : 'year' }})</p>
          <h2 class="price">{{ formatPrice(getSubscriptionCost()) }}</h2>
        </div>
        </section>
        <!-- Step 4 end -->

      <!-- Step 5 start -->
      <section v-show="step === 4" class="step">
        Thank you! Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free to email
        us at support@loremgaming.com.
      </section>
      <section :class="['buttons flex-end', (step > 0 && step < 4 ? 'spaceBetween' : '')]">
        <button v-if="step > 0" @click="$emit('stepBy', -1)" class="go-back">Go Back</button>
        <button @click="$emit('stepBy', 1)" class="next-step">Next Step</button>
      </section>
    </section>
  <!-- </form> -->
  <!-- Step 5 end -->`,
  data() {
    return{
      personalInfo: {
        name: '',
        email: '',
        phone: null
      },
      subscriptionPlan: [
        { name: 'arcade', monthlyPrice: 9, yearlyPrice: 90, img: './assets/images/icon-arcade.svg'},
        { name: 'advanced', monthlyPrice: 12, yearlyPrice: 120, img: './assets/images/icon-advanced.svg' },
        { name: 'pro', monthlyPrice: 15, yearlyPrice: 150, img: './assets/images/icon-pro.svg' }
      ],
      typeOfSubscription: 'monthly',
      subscriptionSelected: null,
      addOns: [
        { name: 'Online service', description: 'Access to multiplayer games', monthlyPrice: 1, yearlyPrice: 10 },
        { name: 'Larger storage', description: 'Extra 1TB of cloud save', monthlyPrice: 2, yearlyPrice: 20 },
        { name: 'Customizable Profile', description: 'Custom theme on your profile', monthlyPrice: 2, yearlyPrice: 20 }
      ],
      selectedProducts: [],
      selectedPlan: {}
    }
  },
  methods: {
    reset() {
      console.log('resetting')
      this.subscriptionSelected = '';
      const radios = document.querySelectorAll("input[type='radio']")
      radios.forEach(radio => {
        radio.checked = false
      });
      this.selectedProducts = [];
    },
    isSelected(id) {
      return this.selectedProducts.includes(id);
    },
    getPriceOfFormated(obj) {
      return this.typeOfSubscription === 'monthly' 
        ? "$" + obj.monthlyPrice + "/mo" 
        : "$" + obj.yearlyPrice + "/yr"
    },
    formatPrice(price){
      return this.typeOfSubscription === 'monthly' 
        ? "$" + price + "/mo" 
        : "$" + price + "/yr"
    },
    getPriceOf(obj) {
      return this.typeOfSubscription === 'monthly' 
        ? obj.monthlyPrice
        : obj.yearlyPrice
    },
    getAddOnNamesArray(add) {
      const wholeName = add.split(" ")
      return  wholeName[0].toLowerCase()
    },
    getSubscriptionCost(){
      let totalCost = null;
      this.selectedProducts.forEach(prod =>{
        totalCost += prod.price
      })
      return totalCost + this.selectedPlan.price;
    },
    changePlan(){
      this.$emit(change-plan)
    }
  },
})