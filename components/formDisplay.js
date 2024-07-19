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
      <!-- Step 1 start -->
      <personal-info v-if="step === 0"></personal-info>
      <!-- Step 1 end -->
      <!-- Step 2 start -->
      <subscription-plans v-if="step === 1"></subscription-plans>
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
      <section :class="['buttons flex-end', (step > 0 && step < 4 ? 'spaceBetween' : '')]">
        <button v-if="step > 0" @click="$emit('stepBy', -1)" class="go-back">Go Back</button>
        <button @click="$emit('stepBy', 1)" class="next-step">Next Step</button>
      </section>
    </section>
  <!-- </form> -->
  <!-- Step 5 end -->`,
  data() {
    return{
      
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
    nextStep(){
      this.$emit('next-step')
    },
    onSubmit(){

    }
  }
})