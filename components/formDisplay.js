app.component('form-display', {
  template:
  /*html*/
  `<!-- Step 1 start -->
  <section class="steps spaceBetween">
    <section v-if="step === 0" class="step personal-info">
      <div class="description">
        <h1 class="title">Personal info</h1>
        <p class="p-description">Please provide your name, email address, and phone number.</p>
      </div>
      <div class="form flex-column">
        <label for="name">Name</label>
        <input type="text" name="name" v-model="name" placeholder="e.g. Stephen King"></input>
        <label for="email">Email Address</label>
        <input type="email" name="email" v-model="email" id="email" placeholder="e.g. stephenking@lorem.com">
        <label for="phone">Phone Number</label>
        <input type="text" name="phone" v-model="phone" id="phone" placeholder="e.g. +1 234 567 890 ">
      </div>
    </section>
    <!-- Step 1 end -->
    <!-- Step 2 start -->
    <section v-if="step === 1" class="step">
      <div class="description">
        <h1 class="title">Select your plan </h1>
        <p class="p-description">You have the option of monthly or yearly billing.</p>
      </div>
      <section class="cards">
            <input type="radio" name="plan" id="arcade" class="radio-plan" />
            <label for="arcade" class="card card-input">
              <img src="./assets/images/icon-arcade.svg" alt="">
              <h2 class="plan">Arcade</h2>
              <h2 class="price">$9/mo</h2>
            </label>
            <input type="radio" name="plan" id="advanced" class="radio-plan" />
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
            </label>
      </section>
      <div class="subscription flex-row">
        <div class="monthly">Monthly</div> 
        <label class="switch" for="type">
          <input type="checkbox" id="type">
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
      Finishing up Double-check everything looks OK before confirming.
      <!-- Dynamically add subscription and add-on selections here -->
      Total (per month/year) Go Back Confirm
      </section>
      <!-- Step 4 end -->

    <!-- Step 5 start -->
    <section v-if="step === 4" class="step">
      Thank you! Thanks for confirming your subscription! We hope you have fun
      using our platform. If you ever need support, please feel free to email
      us at support@loremgaming.com.
    </section>
    <div class="" :class="['buttons flex-end', (step > 0 && step < 4 ? 'spaceBetween' : '')]">
      <button v-if="step > 0" @click="step--" class="go-back">Go Back</button>
      <button @click="step++" class="next-step">Next Step</button>
    </div>
  </section>
  <!-- Step 5 end -->`,
  data() {
    return{
      step: 0,
      name: '',
      email: '',
      phone: null
    }
  },
  methods: {
    checked(event){
      if (event.currentTarget.checked){
        event.currentTarget.closest('.add-on').classList.add("check-selected")
      } else{
        event.currentTarget.closest('.add-on').classList.remove("check-selected")
      }
    }
  }
})