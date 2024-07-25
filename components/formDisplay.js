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
    <!-- step 1 starts -->
      <section v-show="step === 0" class="step personal-info">
        <div class="description">
          <h1 class="title">Personal info</h1>
          <p class="p-description">Please provide your name, email address, and phone number.</p>
        </div>
        <div class="form flex-column">
          <label for="name">Name</label>
          <input type="text" name="name" v-model="name" placeholder="e.g. Stephen King">
          <label for="email">Email Address</label>
          <input type="email" name="email" v-model="email" id="email" placeholder="e.g. stephenking@lorem.com">
          <label for="phone">Phone Number</label>
          <input type="text" name="phone" v-model="phone" id="phone" placeholder="e.g. +1 234 567 890 ">
        </div>
      </section>
      <!-- step 1 ends -->
      <!-- step 2 starts -->
      <section v-show="step === 1" class="step">
        <div class="description">
          <h1 class="title">Select your plan </h1>
          <p class="p-description">You have the option of monthly or yearly billing.</p>
        </div>
        <section class="cards">
          <template v-for="(plan, index) in subscriptionPlan">
            <input type="radio" name="plan" :id="plan.name" :value="index" class="radio-plan" v-model="subscriptionSelected" />
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
      <!-- step 2 ends -->
      <!-- step 3 starts -->
      <section v-show="step === 2" class="step">
        <div class="description">
          <h1 class="title">Pick add-ons</h1>
          <p class="p-description">Add-ons help enhance your gaming experience.</p>
        </div>
        <section class="add-on-plans flex">
        <template v-for="(addOn, index) in addOns">
          <label :for="getAddOnNamesArray(addOn.name)" class="add-on flex">
            <div class="add-on-group flex">
              <div class="add-on-check">
                <input type="checkbox" @click="checked" name="add-on" :id="getAddOnNamesArray(addOn.name)" v-model="addOn.selected">
              </div>
              <div class="add-on-description">
                <h2 class="plan">{{ addOn.name }}</h2>
                <p class="add-on-description">{{ addOn.description }}</p>
              </div>
            </div>
            <div class="add-on-price">{{ getPriceOf(addOn) }}</div>
          </label>
        </template>
        </section>
      </section>
      <!-- Step 3 ends -->

      <!-- Step 4 start -->
      <section v-if="step === 3" class="step">
        <div class="description">
          <h1 class="title">Finishing up</h1>
          <p class="p-description">Double-check everything looks OK before confirming.</p>
        </div>
        <div class="plan-selected">
          <div class="plan-group flex-row spaceBetween align-items-center">
            <div class="plan-description">
              <h2 class="plan">{{ subscriptionPlan[subscriptionSelected].name }}({{ typeOfSubscription }})</h2>
              <p class="secondary underline hover mt-7">Change</p>
            </div>
            <div class="price">
              <h2 class="plan">{{ getPriceOf(subscriptionPlan[subscriptionSelected]) }}</h2>
            </div>
          </div>
          <div>
            <template v-for="addOn in getSelectedProducts()">
              <div class="flex-row spaceBetween pt-16">
                <div class="plan-description">
                  <p class="secondary">{{ addOn.name }}</p>
                </div>
                <div class="price">
                  <h2 class="secondary">{{ getPriceOf(addOn) }}</h2>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="plan-description total m-24 flex-row spaceBetween align-items-center">
          <p class="secondary">Total (per month/year)</p>
          <h2 class="price">$12/mo</h2>
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
      name: '',
      email: '',
      phone: null,
      subscriptionPlan: [
        { name: 'arcade', monthlyPrice: 9, yearlyPrice: 90, img: './assets/images/icon-arcade.svg'},
        { name: 'advanced', monthlyPrice: 12, yearlyPrice: 120, img: './assets/images/icon-advanced.svg' },
        { name: 'pro', monthlyPrice: 15, yearlyPrice: 150, img: './assets/images/icon-pro.svg' }
      ],
      typeOfSubscription: 'monthly',
      subscriptionSelected: null,
      addOns: [
        { name: 'Online service', description: 'Access to multiplayer games', monthlyPrice: 1, yearlyPrice: 10, selected: false },
        { name: 'Larger storage', description: 'Extra 1TB of cloud save', monthlyPrice: 2, yearlyPrice: 20, selected: false },
        { name: 'Customizable Profile', description: 'Custom theme on your profile', monthlyPrice: 2, yearlyPrice: 20, selected: false }
      ],
      selectedProducts: []
    }
  },
  methods: {
    nextStep(){
      this.$emit('next-step')
    },
    onSubmit(){

    },
    reset() {
      console.log('resetting')
      this.subscriptionSelected = ''
      const radios = document.querySelectorAll("input[type='radio']")
      radios.forEach(radio => {
        radio.checked = false
      })
    },
    checked(event){
      if (event.currentTarget.checked){
        event.currentTarget.closest('.add-on').classList.add("check-selected")
      } else{
        event.currentTarget.closest('.add-on').classList.remove("check-selected")
      }
    },
    getPriceOf(obj) {
      return this.typeOfSubscription === 'monthly' 
        ? "$" + obj.monthlyPrice + "/mo" 
        : "$" + obj.yearlyPrice + "/yr"
    },
    getAddOnNamesArray(add) {
      const wholeName = add.split(" ")
      return  wholeName[0].toLowerCase()
    },
    getSelectedProducts() {
      this.selectedProducts = this.addOns.filter(addOn => {
        return addOn.selected;
      });
      return this.selectedProducts
    }
  },
  computed: {
    
  }
})