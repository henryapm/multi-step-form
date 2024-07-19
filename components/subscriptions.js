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
      <template v-for="plan in (typeOfSubscription === 'monthly' ? monthlyPlan : yearlyPlan)">
        <input type="radio" name="plan" :id="plan.name" class="radio-plan" />
        <label :for="plan.name" class="card card-input">
          <img :src="plan.img" alt="">
          <h2 class="plan">{{ plan.name }}</h2>
          <h2 class="price">$ {{ plan.price }}/<abbr v-if="typeOfSubscription === 'monthly'">mo</abbr><abbr v-else>yr</abbr></h2>
        </label>
      </template>
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
  `,
  data(){
    return {
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
  }
})