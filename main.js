const app = Vue.createApp({
   // DATA
   data() {
      return {
         errors: [],
         name: null,
         email: null,
         phone: null,
         contact: null,
      };
   },

   // METHODS
   methods: {

      addUser: function() {
         const userInput = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            contact: this.contact
         }

         let userStorage = JSON.parse(window.localStorage.getItem('user'));

         if(!userStorage) {
            userStorage = {
               [userInput.name] : userInput
            }
         } else {
            userStorage = {
               ...userStorage,
               [userInput.name] : userInput
            }
         }

         localStorage.setItem('user',JSON.stringify(userStorage));

         let userParse = localStorage.getItem('user');
         userParse = JSON.parse(userParse);

         console.log(typeof userParse);
         console.log(userParse);
      },


      checkForm: function () {
         this.errors = [];
         // validate name
         if (!this.name) {
            this.errors.push("Name required.");
         } else if (this.name.length<2 || this.name.length>30) {
            this.errors.push("Name between 2 and 30 characters.");
         }
         //validate email
         if (!this.email) {
            this.errors.push("Email required.");
         } else if (!this.validEmail(this.email)) {
            this.errors.push("Email field is invalid!");
         }
         // validate phone number
         if (!this.phone) {
            this.errors.push("Phone required.");
         } else if (this.phone.length!=10) {
            this.errors.push("Phone number field is invalid.");
         }

         if (!this.errors.length) {
            alert("Succesful, your infomations have been stored in the local storage !");
            this.addUser();
         } else {
            alert(`Please correct the following error(s): ${this.errors}`);
         }

      },

      validEmail: function (email) {
         var re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(email);
      },

      clearForm: function() {
         this.name = null,
         this.email = null,
         this.phone = null
         this.contact = null
      }
   },

   // COMPUTED
   computed: {},
}).mount("#app");
