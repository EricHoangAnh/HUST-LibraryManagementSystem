import { createStore } from "vuex";
import getters from "./getters";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
