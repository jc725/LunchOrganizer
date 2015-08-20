
function User(name, pw, email) {
  this.name = name;
  this.password = pw;
  this.email = email;
  
  this.locations = [];

  this.foodCategories = {};
  this.dietary = {};
  this.pricePref = 0;

  function addLocation(loc) {
    locations.push(loc);
  };
};


var userlist = [
  new User("Sylvie", "sylvieRules1", "sylvie28392@gmail.com"),
  new User("Reva", "revaRules1", "reva28392@gmail.com"),
  new User("Justin", "justinRules1", "justin28392@gmail.com"),
  new User("Amy", "amyRules1", "amy28392@gmail.com"),
  new User("Bill", "billRules1", "bill28392@gmail.com"),
];

userlist[0].foodCategories = {"seafood", "chinese", "mexican"};
userlist[0].dietary = {};
userlist[0].pricePref = 2.5;

userlist[1].foodCategories = {"salad", "thai", "mexican"};
userlist[1].dietary = {};
userlist[1].pricePref = 2;

userlist[2].foodCategories = {"thai", "seafood", "greek", "burgers"};
userlist[2].dietary = {"gluten_free"};
userlist[2].pricePref = 0; // result to be ignored

userlist[3].foodCategories = {"japanese", "burgers", "polish"};
userlist[3].dietary = {};
userlist[3].pricePref = 1.5;

userlist[4].foodCategories = {"mexican", "greek"};
userlist[4].dietary = {"vegetarian"};
userlist[4].pricePref = 2;

