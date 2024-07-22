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
      <personal-info v-show="step === 0"></personal-info>
      <subscription-plans v-show="step === 1"></subscription-plans>
      <add-ons v-show="step === 2"></add-ons>
      <!-- Step 4 start -->
      <section v-show="step === 3" class="step">
        <div class="description">
          <h1 class="title">Finishing up</h1>
          <p class="p-description">Double-check everything looks OK before confirming.</p>
        </div>
        <div class="plan-selected">
          <div class="plan-group flex-row spaceBetween align-items-center">
            <div class="plan-description">
              <h2 class="plan">arcarde (monthly)</h2>
              <p class="secondary underline hover mt-7">Change</p>
            </div>
            <div class="price">
              <h2 class="plan">$9/mo</h2>
            </div>
          </div>
          <div>
            <div class="flex-row spaceBetween pt-16">
              <div class="plan-description">
                <p class="secondary">Online service</p>
              </div>
              <div class="price">
                <h2 class="secondary">+$2/mo</h2>
              </div>
            </div>
            <div class="flex-row spaceBetween pt-16">
              <div class="plan-description">
                <p class="secondary">Larger storage</p>
              </div>
              <div class="price">
                <h2 class="secondary">+$1/mo</h2>
              </div>
            </div>
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
      
    }
  },
  methods: {
    nextStep(){
      this.$emit('next-step')
    },
    onSubmit(){

    }
  }
})