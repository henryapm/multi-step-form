const app = Vue.createApp({
  data() {
    return{
      step: 0,
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
      this.step = 1
    },
    isFormComplete(){
      // return true if every value is true otherwise false
      return Object.values(this.form.personalInfo).every(value => value)
    },
    changeStep(by){
      // before changing the step the required variable needs to be true 
      // to validate the form
      this.required = true;
      if (this.isFormComplete()){
        this.step += by;
      } 

    }
  },
});