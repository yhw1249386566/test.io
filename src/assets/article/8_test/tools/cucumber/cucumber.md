# 概念

一个自动化测试工具

# [快速开始](https://cucumber.io/docs/guides/10-minute-tutorial/) 

# 示例

## 基本使用

```text
Feature: 一个测试模块的名字
	// 此模块说明
	
	Scenario: 一个测试场景的说明。在 Feature 中可以有 1 个或多个
  	Given // 初始化。如：初始化一些数据，准备一些事物。
  	When	// 动作。如：利用 初始化数据/准备的事物 做一些事情
  	Then // 结果。如：最后得到的结果应该是什么
```

```text
// features/is_it_friday_yet.feature
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday
    Given today is Sunday
    When I ask whether it's Friday yet
    Then I should be told "Nope"

  Scenario: Friday is Friday
    Given today is Friday
    When I ask whether it's Friday yet
    Then I should be told "TGIF"
```

```text
// features/step-definitions/stepdefs.js
const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");

function isItFriday(today) {
  if (today === "Friday") {
    return "TGIF";
  } else {
    return "Nope";
  }
}

Given("today is Sunday", function () {
  this.today = "Sunday";
});

Given("today is Friday", function () {
  this.today = "Friday";
});

When("I ask whether it's Friday yet", function () {
  this.actualAnswer = isItFriday(this.today);
});

Then("I should be told {string}", function (expectedAnswer) {
  assert.strictEqual(this.actualAnswer, expectedAnswer);
});
```

# Reference

- [Cucumber 官方](https://cucumber.io/docs/guides/overview/) 
- [更显而易见的文档-官方](https://cucumber.io/docs/cucumber/)  

Cucumber 配置 [Puppeteer](https://pptr.dev/) 一起使用是很好的。