<template>
  <div class="input-wraper">
    <input
      class="ui-input-item-input"
      type="text"
      :disabled="disabled"
      :placeholder="placeholder"
      autocomplete="off"
      ref="place"
      @input="parseViewValue($event.target.value)"
      @blur="blurHandler"
      @focus="focusHandler"
    />
  </div>
</template>

<script>
/**
 * usage:
 * default:  mode:12.2,format:true,decimals:2
 * <ui-amount  placeholder="请输入转入金额" name="amount" v-model="amount" mode="8.2" format="false" decimals="3"></ui-amount>
 */

let decimalSeparator = ".";
let groupSeparator = ",";
let NUMBER_REGEXP = /^(\d+|(\d*(\.\d*)))$/;
let MODE_REGEXP = /^(\d+)(\.(\d+))?$/;

export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    decimals: {
      type: Number,
      default: 2,
    },
    title: {
      type: String,
      default: "￥",
    },
    placeholder: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "12.2",
    },
    max: {
      type: Number,
      default: 12,
    },
    format: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  mounted: function () {
    this.decimal = /^\d+$/.test(this.decimals)
      ? parseInt(this.decimals, 10)
      : 2; // Number of decimals. Default 2.
    this.formatting = this.format == "false" ? false : true; //default true
    if (MODE_REGEXP.test(this.mode)) {
      this.intLength = parseInt(RegExp.$1, 10);
      this.dotLength = RegExp.$2 && parseInt(RegExp.$3, 10);
    } else {
      this.intLength = 12;
      this.dotLength = 2;
    }
    this.inputEl = this.$refs["place"];
    console.log("mounted..." + this.value);
    this.formatModelVal(this.value);
    this.$setModelVal(this.value);
  },
  methods: {
    parseViewValue: function (value) {
      // Handle leading decimal point, like ".5"
      if (value.indexOf(".") === 0) {
        value = "0" + value;
      }
      if (value == undefined || value == "") {
        this.$setModelVal("");
      }
      if (NUMBER_REGEXP.test(value)) {
        var index = value.indexOf(".");
        if (index > 0) {
          var intString = value.substring(0, index);
          var dotString = value.substring(index + 1, value.length);
          if (
            intString.length > this.intLength ||
            dotString.length > this.dotLength
          ) {
            // Render the last valid input in the field
            this.renderLastValidValue();
          } else {
            this.$setModelVal(parseFloat(value, 10));
          }
        } else {
          if (value.length > this.intLength) {
            // Render the last valid input in the field
            this.renderLastValidValue();
          } else {
            this.$setModelVal(parseFloat(value, 10));
          }
        }
      } else {
        this.renderLastValidValue();
      }
    },
    formatModelVal: function (value) {
      this.$modelValue = value;
      this._lastValidValue = value;
      let viewVal = this.formatPrecision(value);
      this.inputEl.value = viewVal;
      console.log("setInputEl..." + this.inputEl.value);
    },
    focusHandler: function (event) {
      this.inputEl.value = this.$modelValue || "";
      //   console.log('focusHandler...');
    },
    blurHandler: function (event) {
      var value = this.$modelValue;
      this.inputEl.value = this.formatPrecision(value);
      //   console.log('blurHandler...');
    },
    formatPrecision: function (value) {
      if (value == "" || value == undefined || value == null) {
        return "";
      }
      var formattedValue = parseFloat(value).toFixed(this.decimal);
      formattedValue = formattedValue.replace(".", decimalSeparator);
      return this.numberWithCommas(formattedValue);
    },
    numberWithCommas: function (value) {
      if (this.formatting) {
        var parts = ("" + value).split(decimalSeparator);
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
        return parts.join(decimalSeparator);
      } else {
        return value;
      }
    },
    renderLastValidValue: function () {
      this.inputEl.value = this._lastValidValue;
    },
    $setModelVal: function (value) {
      if (this._lastValidValue != value) {
        this._lastValidValue = value;
        this.$modelValue = value;
        this.$emit("input", value != "" ? String(value) : "");
      }
    },
  },
};
</script>

<style></style>
