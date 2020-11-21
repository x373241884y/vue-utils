<template>
  <el-input
    :disabled="disabled"
    type="text"
    :placeholder="placeholder"
    :value="showValue"
    @input="parseInputValue"
    auto-complete="off"
  >
    <template slot="suffix" v-if="appendText">{{ appendText }}</template>
  </el-input>
</template>

<script>
//  <only-number placeholder="请输入融资金额" v-model="formData.amount123" appendText="万元"> </only-number>
export default {
  props: ["value", "max", "placeholder", "appendText", "disabled"],
  data() {
    return {
      showValue: "",
      modelValue: "",
    };
  },
  mounted: function () {
    if (/^\d+$/.test(this.max)) {
      this.maxlength = parseInt(this.max);
    } else {
      this.maxlength = 7;
    }
    if (this.value) {
      this.$setViewValue(this.value);
      this.$setModelValue(this.value);
    }
  },
  methods: {
    parseInputValue: function (value) {
      // console.log('parseInputValue:', value);
      if (value == undefined || value == "") {
        this.$setViewValue(value);
        this.$setModelValue(value);
        return value;
      }
      if (/^\d+$/.test(value)) {
        if (this.maxlength > 0 && value.length > this.maxlength) {
          this.$setViewValue(this._lastValidValue);
        } else {
          this.$setViewValue(value);
          this.$setModelValue(value);
        }
      } else {
        this.$setViewValue(this._lastValidValue);
      }
    },
    $setViewValue: function (value) {
      this.showValue = value;
    },
    $setModelValue: function (value) {
      if (this._lastValidValue != value) {
        this._lastValidValue = value;
        this.modelValue = value;
        if (this.modelValue) {
          this.$emit("input", Number(value));
        } else {
          this.$emit("input", value);
        }
      }
    },
  },
};
</script>

<style></style>
