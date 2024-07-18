app.component('form-display', {
  template:
  /*html*/
  `
  <!-- <form @submit.prevent="onSubmit"> -->
    <section class="steps spaceBetween">
      <!-- Step 1 start -->
      <personal-info v-if="step === 0"></personal-info>
      <!-- Step 1 end -->
      <!-- Step 2 start -->
      <section v-if="step === 1" class="step">
        <div class="description">
          <h1 class="title">Select your plan </h1>
          <p class="p-description">You have the option of monthly or yearly billing.</p>
        </div>
        <section class="cards">
          <template v-for="plan in (typeOfSubscription === 'monthly' ? monthlyPlan : yearlyPlan)">
            <input type="radio" name="plan" :id="plan.name" class="radio-plan" />
            <label :for="plan.name" class="card card-input">
              <img :src="plan.img" alt="">
              <h2 class="plan">{{ plan.name }}</h2>
              <h2 class="price">$ {{ plan.price }}/<abbr v-if="typeOfSubscription === 'monthly'">mo</abbr><abbr v-else>yr</abbr></h2>
            </label>
          </template>
          <!-- <input type="radio" name="plan" id="advanced" class="radio-plan" />
          <label for="advanced" class="card card-input">
            <img src="./assets/images/icon-advanced.svg" alt="">
            <h2 class="plan">Advanced</h2>
            <h2 class="price">$12/mo</h2>
          </label>
          <input type="radio" name="plan" id="pro" class="radio-plan" />
          <label for="pro" class="card card-input">
            <img src="./assets/images/icon-pro.svg" alt="">
            <h2 class="plan">Pro</h2>
            <h2 class="price">$15/mo</h2>
          </label> -->
        </section>
        <div class="subscription flex-row">
          <div class="monthly">Monthly</div> 
          <label class="switch" for="type">
            <input type="checkbox" id="type" v-model="typeOfSubscription" true-value="yearly" false-value="monthly">
            <span class="slider round"></span>
          </label>
          <div class="yearly">Yearly</div>
        </div>
      </section>
      <!-- Step 2 end -->
      <!-- Step 3 start -->
      <section v-if="step === 2" class="step">
        <div class="description">
          <h1 class="title">Pick add-ons</h1>
          <p class="p-description">Add-ons help enhance your gaming experience.</p>
        </div>
        <section class="add-on-plans flex">
          <div class="add-on flex">
            <div class="add-on-group flex">
              <div class="add-on-check">
                <input type="checkbox" @click="checked" name="add-on" id="">
              </div>
              <div class="add-on-description">
                <h2 class="plan">Online service</h2>
                <p class="add-on-description">Access to multiplayer games</p>
              </div>
            </div>
            <div class="add-on-price">+$1/mo</div>
          </div>
          <div class="add-on">
            <div class="add-on-group">
              <div class="add-on-check"><input type="checkbox" @click="checked" name="add-on" id=""></div>
              <div class="add-on-description">
                <h2 class="plan">Larger storage</h2>
                <p class="add-on-description">Extra 1TB of cloud save</p>
              </div>
            </div>
            <div class="add-on-price">+$2/mo</div>
          </div>
          <div class="add-on">
            <div class="add-on-group">
              <div class="add-on-check"><input type="checkbox" @click="checked" name="add-on" id=""></div>
              <div class="add-on-description">
                <h2 class="plan">Customizable Profile</h2>
                <p class="add-on-description">Custom theme on your profile</p>
              </div>
            </div>
            <div class="add-on-price">+$2/mo</div>
          </div>
        </section>
      </section>
      <!-- Step 3 end -->
      <!-- Step 4 start -->
      <section v-if="step === 3" class="step">
        <div class="description">
          <h1 class="title">Finishing up</h1>
          <p class="p-description">Double-check everything looks OK before confirming.</p>
        </div>

        <!-- Dynamically add subscription and add-on selections here -->
        Total (per month/year)
        </section>
        <!-- Step 4 end -->

      <!-- Step 5 start -->
      <section v-if="step === 4" class="step">
        Thank you! Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free to email
        us at support@loremgaming.com.
      </section>
      <section class="" :class="['buttons flex-end', (step > 0 && step < 4 ? 'spaceBetween' : '')]">
        <button v-if="step > 0" @click="step--" class="go-back">Go Back</button>
        <button @click="step++" class="next-step">Next Step</button>
      </section>
    </section>
  <!-- </form> -->
  <!-- Step 5 end -->`,
  data() {
    return{
      step: 0,
      monthlyPlan: [
        { name: 'arcade', price: 9, img: './assets/images/icon-arcade.svg'},
        { name: 'advanced', price: 12, img: './assets/images/icon-advanced.svg' },
        { name: 'pro', price: 15, img: './assets/images/icon-pro.svg' }
      ],
      yearlyPlan: [
        { name: 'arcade', price: 90, img: './assets/images/icon-arcade.svg'},
        { name: 'advanced', price: 120, img: './assets/images/icon-advanced.svg' },
        { name: 'pro', price: 150, img: './assets/images/icon-pro.svg' }
      ],
      typeOfSubscription: 'monthly'
    }
  },
  methods: {
    checked(event){
      if (event.currentTarget.checked){
        event.currentTarget.closest('.add-on').classList.add("check-selected")
      } else{
        event.currentTarget.closest('.add-on').classList.remove("check-selected")
      }
    },
    onSubmit(){

    }
  }
})