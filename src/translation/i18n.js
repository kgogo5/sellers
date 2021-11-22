import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend) // loads translations from your server
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ko: {
        translation: {
          header: [
            { title: "홈", address: "/" },
            {
              title: "상품관리",
              address: "/product",
              sub: [
                { title: "상품등록", address: "/product/regist" },
                { title: "상품조회/수정", address: "/product/inquiry" },
              ],
            },
            {
              title: "주문관리",
              address: "/order",
              sub: [
                { title: "배송관리", address: "/order/delivery" },
                { title: "취소관리", address: "/order/cancel" },
                { title: "반품관리", address: "/order/return" },
                { title: "교환처리", address: "/order/exchange" },
                { title: "재배송관리", address: "/order/redelivery" },
                { title: "상품미도착관리", address: "/order/nonarrival" },
                { title: "판매완료내역", address: "/order/salescompletion" },
                { title: "판매취소내역", address: "/order/salescancel" },
              ],
            },
            {
              title: "정산관리",
              address: "/settlement",
              sub: [
                { title: "판매/정산현황", address: "/order/calculate" },
                { title: "송금완료", address: "/order/remittance" },
                { title: "세금계산서 수신내역", address: "/order/taxbill" },
                { title: "부가세신고내역", address: "/order/vat" },
                {
                  title: "공제증빙 수신내역",
                  address: "/order/proofofdeduction",
                },
                { title: "포인트 사은품 정산", address: "/order/pointgift" },
              ],
            },
            { title: "판매자 정보", address: "/seller" },
            { title: "문의", address: "/question" },
            { title: "애널리틱스", address: "/analytics" },
            { title: "관리", address: "/setting" },
            { title: "로그인", address: "/login" },
          ],
        },
      },

      en: {
        translation: {
          header: [
            { title: "Home", address: "/" },
            {
              title: "Product",
              address: "/product",
              sub: [
                { title: "Regist", address: "/product/regist" },
                { title: "Inquiry", address: "/product/inquiry" },
              ],
            },
            {
              title: "Order",
              address: "/order",
              sub: [
                { title: "Delivery", address: "/order/delivery" },
                { title: "Cancellation", address: "/order/cancel" },
                { title: "Return", address: "/order/return" },
                { title: "Exchange", address: "/order/exchange" },
                { title: "Re Delivery", address: "/order/redelivery" },
                { title: "Non Arrival", address: "/order/nonarrival" },
                {
                  title: "Sales Completion",
                  address: "/order/salescompletion",
                },
                { title: "Sales Cancellation", address: "/order/salescancel" },
              ],
            },
            {
              title: "Settlement",
              address: "/settlement",
              sub: [
                { title: "Calculate Status", address: "/order/calculate" },
                { title: "Remittance Completed", address: "/order/remittance" },
                {
                  title: "Tax invoice receipt details",
                  address: "/order/taxbill",
                },
                { title: "VAT report details", address: "/order/vat" },
                {
                  title: "Receipt of proof of deduction",
                  address: "/order/proofofdeduction",
                },
                { title: "Point gift settlement", address: "/order/pointgift" },
              ],
            },
            { title: "Seller", address: "/seller" },
            { title: "Question", address: "/question" },
            { title: "Analytics", address: "/analytics" },
            { title: "Setting", address: "/setting" },
            { title: "Login", address: "/login" },
          ],
        },
      },
    },
  });

export default i18n;
