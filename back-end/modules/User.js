const mongoose = require("mongoose");
const passwordValidator = require("password-validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8, "Password must be at least 8 characters long")
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      maxlength: [50, "Username must be less than 50 characters"],
      minlength: [3, "Username must be more than 3 characters"],
      max: [50, "Username must be less than 50 characters"],
      min: [3, "Username must be more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      //validate will send a json with the error message
      validate: {
        validator: function (value) {
          return passwordSchema.validate(value);
        },
        message: (arg) => {
          const err = passwordSchema
            .validate(arg.value, {
              details: true,
            })
            .map((item) => item.message)
            .join(",");

          return `${err} is not a valid password!`;
        },
      },
      select: false,
    },
    taskes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    changedPassword: Date,
    validationToken: {
      type: String,
    },
    isValide: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.changedPassword = Date.now();
  next();
});

//check if password is correct
userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//check if password is changed after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.changedPassword) {
    const changedTimestamp = parseInt(
      this.changedPassword.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
