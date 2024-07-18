app.component('personal-info',{
  template:
  /*html*/
  `
    <section class="step personal-info">
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
  `,
  data(){
    return {      
      name: '',
      email: '',
      phone: null,
    }
  }
})