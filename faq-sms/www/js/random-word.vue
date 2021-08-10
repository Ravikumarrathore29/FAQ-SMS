<template>
  <div>
    <div class="pill-nav">
      <a
        @click="smsFunc"
        :class="{ active: selected == 1, disabled: btnGTDisabled }"
        href="#"
        >Get Token</a
      >
      <a
        @click="getListOfFaq"
        :class="{ active: selected == 2, disabled: btnFaqDisabled }"
        href="#"
        >FAQ</a
      >
    </div>
    <br />
    <br />
    <div class="center-content">
      <div v-if="typeOfMsg == 'initialMsg'">{{ message }}</div>
      <div v-if="typeOfMsg == 'timerMsg'">
        You will receive SMS within {{ remainingTime }} second
      </div>
      <span v-if="typeOfMsg == 'tokenReceivedMsg'">{{ token }}</span>
      <div v-if="typeOfMsg == 'loading'">{{ loading }}</div>
      <div v-if="typeOfMsg == 'faqDataReceived'">
        <div v-for="faq in faqdetails" :key="faq.id">
          <br />
          <div class="cards">
            <article class="card">
              <header>
                <h5>{{ faq.name }}</h5>
                <hr />
                <h6>{{ faq.id }} - {{ faq.slug }}</h6>
                <hr />
              </header>
              <div class="content">
                <p>NAME :: {{ faq.name }}</p>
                <p>MODIFIED DATE :: {{ faq.modified }}</p>
                <p>CREATED DATE :: {{ faq.created }}</p>
                <div v-html="faq.text"></div>
              </div>
              <footer>
                <textarea
                  placeholder="Add Your Comments Here"
                ></textarea>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sms from "./Sms";
import Faq from "./Faq";

export default {
  data() {
    return {
      typeOfMsg: "initialMsg",
      message: "Tap on Get Token Button",
      selected: undefined,
      remainingTime: 0,
      btnGTDisabled: false,
      btnFaqDisabled: false,
      faqdetails: null,
    };
  },
  methods: {
     smsFunc() {
       //function only for sms related task
      this.selected = 1;
      Sms.xport.myfuncA(this);
    },
    getListOfFaq() {
       //function only for faq related task
      this.selected = 2;
      Faq.xport.myfuncB(this);
    }
  },
};
</script>
