app.component('subscription-plans', {
  template:
  /*html*/
  `
  <section class="step">
    <div class="description">
      <h1 class="title">Select your plan </h1>
      <p class="p-description">You have the option of monthly or yearly billing.</p>
    </div>
    <section class="cards">
      <template v-for="plan in subscriptionPlan">
        <input type="radio" name="plan" :id="plan.name" :value="plan.name + '(' + typeOfSubscription + ')'" class="radio-plan" v-model="subSelected" />
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
  `,
  data(){
    return {
      subscriptionPlan: [
        { name: 'arcade', monthlyPrice: 9, yearlyPrice: 90, img: './assets/images/icon-arcade.svg'},
        { name: 'advanced', monthlyPrice: 12, yearlyPrice: 120, img: './assets/images/icon-advanced.svg' },
        { name: 'pro', monthlyPrice: 15, yearlyPrice: 150, img: './assets/images/icon-pro.svg' }
      ],
      typeOfSubscription: 'monthly',
      subSelected: ''
    }
  }, 
  methods: {
    reset() {
      console.log('resetting')
      this.subSelected = ''
      const radios = document.querySelectorAll("input[type='radio']")
      radios.forEach(radio => {
        radio.checked = false
      })
    }
  }
})