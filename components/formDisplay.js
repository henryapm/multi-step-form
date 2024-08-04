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
    <section class="steps" :class="{spaceAround: step === 4}">
    <!-- Personal Information -->
      <section v-show="step === 0" class="step personal-info">
        <div class="description">
          <h1 class="title">Personal info</h1>
          <p class="p-description">Please provide your name, email address, and phone number.</p>
        </div>
        <div class="form flex-column">
          <div class="flex-row spaceBetween"><label for="name">Name</label><span v-show="required && !form.personalInfo.name" class="required">This field is required</span></div>
          <input type="text" name="name" v-model="form.personalInfo.name" id="name" placeholder="e.g. Stephen King" required class="form" :class="{ required: required && !form.personalInfo.name }">
          <div class="flex-row spaceBetween"><label for="email">Email Address</label><span v-show="required && !form.personalInfo.email" class="required">This field is required</span></div>
          <input type="email" name="email" v-model="form.personalInfo.email" id="email" placeholder="e.g. stephenking@lorem.com" required class="form" :class="{ required: required && !form.personalInfo.email }">
          <div class="flex-row spaceBetween"><label for="phone">Phone Number</label><span v-show="required && !form.personalInfo.phone" class="required">This field is required</span></div>
          <input type="text" name="phone" v-model="form.personalInfo.phone" id="phone" placeholder="e.g. +1 234 567 890 " required class="form" :class="{ required: required && !form.personalInfo.phone }">
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
            <input type="radio" name="plan" :id="plan.name" :checked="plan.isChecked" :value="{id: index, price: plan.price[typeOfSubscription]}" class="radio-plan" v-model="form.selectedPlan" />
            <label :for="plan.name" class="card card-input">
              <img :src="plan.img" :alt="plan.name">
              <h2 class="plan">{{ plan.name }}</h2>
              <h2 class="price">{{ formatPrice(plan.price[typeOfSubscription]) }}</h2>
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
          <label :for="getAddOnNamesArray(addOn.name)" class="add-on flex" :class="{ checkSelected: isSelected(index) }">
            <div class="add-on-group flex">
              <div class="add-on-check">
                <input type="checkbox" name="add-on" :id="getAddOnNamesArray(addOn.name)" v-model="form.selectedProducts" :value="{ id: index, name: addOn.name, price: addOn.price[typeOfSubscription] }">
              </div>
              <div class="add-on-description">
                <h2 class="plan">{{ addOn.name }}</h2>
                <p class="add-on-description">{{ addOn.description }}</p>
              </div>
            </div>
            <div class="add-on-price">{{ formatPrice(addOn.price[typeOfSubscription]) }}</div>
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
              <h2 class="plan">{{ subscriptionPlan[form.selectedPlan.id].name }}({{ typeOfSubscription }})</h2>
              <p class="secondary underline hover mt-7" @click="changePlan">Change</p>
            </div>
            <div class="price">
              <h2 class="plan">{{ formatPrice(subscriptionPlan[form.selectedPlan.id].price[typeOfSubscription]) }}</h2>
            </div>
          </div>
          <div>
            <template v-for="addOn in form.selectedProducts">
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
      <section v-show="step === 4" class="step align-items-center">
        <div class="description flex flex-column align-items-center justify-content-center mx-w ">
          <img src="../assets/images/icon-thank-you.svg"/>
          <h1 class="title">Thank you!</h1>
          <p class="p-description center">
            Thanks for confirming your subscription! We hope you have fun
            using our platform. If you ever need support, please feel free to email
            us at support@loremgaming.com.
          </p>
        </div> 
      </section>
      <section v-if="step >= 0 && step < 4" :class="['buttons flex-end', (step > 0 && step < 4 ? 'spaceBetween' : '')]">
        <button v-if="step > 0" @click="$emit('stepBy', -1)" class="go-back">Go Back</button>
        <button @click="changeStep" class="next-step" :class="{ confirm: step === 3 }">{{ step != 3 ? 'Next Step' : 'Confirm'}}</button>
      </section>
    </section>
  <!-- </form> -->
  <!-- Step 5 end -->`,
  data() {
    return{
      form: {
        personalInfo: { name: '', email: '', phone: null },
        selectedProducts: [],
        selectedPlan: {id: 0, price: 9},
      },
      required: false,
      typeOfSubscription: 'monthly',
      subscriptionPlan: [
        { name: 'arcade', price: {monthly: 9, yearly: 90}, img: './assets/images/icon-arcade.svg', isChecked: true},
        { name: 'advanced', price: {monthly: 12, yearly: 120}, img: './assets/images/icon-advanced.svg', isChecked: false },
        { name: 'pro', price: {monthly: 15, yearly: 150}, img: './assets/images/icon-pro.svg', isChecked: false }
      ],
      addOns: [
        { name: 'Online service', description: 'Access to multiplayer games', price:{ monthly: 1, yearly: 10} },
        { name: 'Larger storage', description: 'Extra 1TB of cloud save', price:{ monthly: 2, yearly: 20} },
        { name: 'Customizable Profile', description: 'Custom theme on your profile', price:{ monthly: 2, yearly: 20} }
      ],
      FormCompleted: false,
    }
  },
  methods: {
    reset() {
      this.form.selectedProducts = []
    },
    isSelected(id) {
      return this.form.selectedProducts.some(el => el.id === id);
    },
    formatPrice(price){
      return this.typeOfSubscription === 'monthly' 
        ? "$" + price + "/mo" 
        : "$" + price + "/yr"
    },
    getAddOnNamesArray(add) {
      const wholeName = add.split(" ")
      return  wholeName[0].toLowerCase()
    },
    getSubscriptionCost(){
      let totalCost = null;
      this.form.selectedProducts.forEach(prod =>{
        totalCost += prod.price
      })
      return totalCost + this.subscriptionPlan[this.form.selectedPlan.id].price[this.typeOfSubscription];
    },
    changePlan(){
      this.$emit('changeStep')
    },
    isFormComplete(){
      return Object.values(this.form.personalInfo).every(value => value)
    },
    changeStep(){
      this.required = true;
      this.isFormComplete() && this.$emit('stepBy', 1);
    }
  },
})