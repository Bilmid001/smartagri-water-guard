const messages = {
  en: {
    water: 'Water your {crop} today. The water need score na {score} percent, and the advice na make you use {level} irrigation. {reason} Add water small small, and check the soil before you water again.',
    wait: 'No need to water your {crop} today. The water need score na {score} percent, and rain fit fall with {rain} percent chance. Check the soil after the rain or tomorrow. No let water gather around the roots.',
    skipped: 'If your crop need water and e no get am, e fit wilt, grow slowly, produce fewer flowers or grains, and give you less harvest. Check the soil, and water am small small when e dry.',
    excess: 'Too much water fit push air out of the soil, damage roots, wash nutrients away, and bring plant disease. Water slowly, and stop if water start to gather on the ground.',
    reason: { hot: 'Hot weather fit make the soil dry faster.', dry: 'Dry air fit make the soil dry faster.', rain: 'Rain fit fall, so wait and check if the water reach the roots.' },
    title: 'Wetin fit happen to your crops?', speak: '🔊 Read advice aloud', stop: '⏹ Stop speaking', language: 'Advice language', waterRisk: 'If you no water the crop when e need am', excessRisk: 'If you put too much water',
  },
  ha: {
    water: 'Ka shayar da {crop} yau. Makin bukatar ruwa kashi {score} cikin dari ne, kuma matakin shayarwar da aka ba da shawara shi ne {level}. {reason} Ka zuba ruwan a hankali, sannan ka duba kasa kafin sake shayarwa.',
    wait: 'Kada ka shayar da {crop} yau. Makin bukatar ruwa kashi {score} cikin dari ne, kuma yiwuwar ruwan sama kashi {rain} cikin dari ce. Ka sake duba kasa bayan ruwan sama ko gobe. Kada ka bar ruwa ya taru a kusa da saiwa.',
    skipped: 'Idan amfanin gona yana bukatar ruwa amma ya rasa shi, zai iya yin kasa, ya yi jinkirin girma, furanni ko hatsi su ragu, kuma amfanin gona ya yi kasa. Ka duba kasa, sannan ka shayar da kadan idan ta bushe.',
    excess: 'Ruwa da yawa na iya hana iska shiga kasa, ya lalata saiwa, ya wanke sinadaran gina jiki, kuma ya taimaka wa cututtuka. Ka zuba ruwa a hankali; ka tsaya idan ya fara taruwa.',
    reason: { hot: 'Zafi na iya sa kasa ta bushe da sauri.', dry: 'Karancin danshi a iska na iya sa kasa ta bushe da sauri.', rain: 'Ana sa ran ruwan sama, don haka ka jira ka duba ko ya jika inda saiwa suke.' },
    title: 'Me zai iya faruwa da amfanin gonarka?', speak: '🔊 Karanta shawarar da murya', stop: '⏹ Dakatar da magana', language: 'Yaren shawara', waterRisk: 'Idan ka hana shukar ruwan da take bukata', excessRisk: 'Idan ka zuba ruwa fiye da kima',
  },
  yo: {
    water: 'Fun irugbin {crop} ni omi loni. Iye iwulo omi je ida {score} ninu ogorun, ipele agbe ti a daba si ni {level}. {reason} Fi omi kun die-die, ki o si wo ile ki o to tun fun omi.',
    wait: 'Ma fun irugbin {crop} ni omi loni. Iye iwulo omi je ida {score} ninu ogorun, anfani ojo si je ida {rain} ninu ogorun. Tun wo ile leyin ojo tabi ni ola. Ma je ki omi duro ni ayika gbongbo.',
    skipped: 'Ti irugbin ba nilo omi ti ko si ri i, o le rọ, dagba die-die, ododo tabi eso le dinku, ikore si le kere. Wo ile, ki o fun ni omi die ti ile ba gbẹ.',
    excess: 'Omi pupo le ko afefe kuro ninu ile, ba gbongbo je, fo ounje ile lo, o si le fa arun. Fun ni omi die-die; da duro ti omi ba n ko jo.',
    reason: { hot: 'Ooru le mu ki ile gbẹ ni kiakia.', dry: 'Afefe gbigbẹ le mu ki ile gbẹ ni kiakia.', rain: 'Ojo le ro, nitorina duro ki o si wo boya ile ti tutu de odo gbongbo.' },
    title: 'Ki ni o le sele si irugbin re?', speak: '🔊 Ka imoran naa jade', stop: '⏹ Da oro duro', language: 'Ede imoran', waterRisk: 'Ti o ba fo omi ti irugbin nilo', excessRisk: 'Ti o ba fun ni omi ju',
  },
  ig: {
    water: 'Were ihe ubi {crop} mmiri taa. Akara mkpa mmiri bụ pasent {score}, ma ọkwa ịgba mmiri a tụrụ aro bụ {level}. {reason} Wụsa mmiri nke nta nke nta, lelee ala tupu ịgbara ọzọ.',
    wait: 'Egbala ihe ubi {crop} mmiri taa. Akara mkpa mmiri bụ pasent {score}, ohere mmiri ozuzo bụ pasent {rain}. Lelee ala ọzọ mgbe mmiri ozuzo gasịrị ma ọ bụ echi. Ekwela ka mmiri guzoro n’akụkụ mgbọrọgwụ.',
    skipped: 'Ọ bụrụ na ihe ubi chọrọ mmiri ma ọ nwetaghị ya, ọ nwere ike ịkpọ nkụ, too nwayọọ, mịpụta ifuru ma ọ bụ ọka ole na ole, ma nye obere owuwe ihe ubi. Lelee ala ma gbaa ya mmiri ntakịrị mgbe ala kpọrọ nkụ.',
    excess: 'Mmiri gabigara ókè nwere ike ịchụpụ ikuku n’ala, mebie mgbọrọgwụ, sachapụ nri ala, ma kwalite ọrịa. Wụsa mmiri nwayọọ; kwụsị ma ọ bụrụ na ọ malite ịkwakọba.',
    reason: { hot: 'Okpomọkụ nwere ike ime ka ala kpọọ nkụ ngwa ngwa.', dry: 'Obere iru mmiri n’ikuku nwere ike ime ka ala kpọọ nkụ ngwa ngwa.', rain: 'A na-atụ anya mmiri ozuzo, ya mere chere ma lelee ma mmiri ahụ erutela mgbọrọgwụ.' },
    title: 'Gịnị nwere ike ime n’ihe ubi gị?', speak: '🔊 Gụọ ndụmọdụ n’olu', stop: '⏹ Kwụsị ikwu okwu', language: 'Asụsụ ndụmọdụ', waterRisk: 'Ọ bụrụ na ị gbochie mmiri ihe ubi chọrọ', excessRisk: 'Ọ bụrụ na ị wụsa mmiri gabigara ókè',
  },
};

export const GUIDANCE_LANGUAGES = [
  { id: 'en', label: 'Pidgin English', voice: 'en-NG' },
  { id: 'ha', label: 'Hausa', voice: 'ha-NG' },
  { id: 'yo', label: 'Yorùbá', voice: 'yo-NG' },
  { id: 'ig', label: 'Igbo', voice: 'ig-NG' },
];

export function getFarmGuidance({ language = 'en', crop, score, level, rainProbability, temperature, humidity, decision }) {
  const copy = messages[language] || messages.en;
  const reason = temperature > 30 ? copy.reason.hot : humidity < 40 ? copy.reason.dry : rainProbability >= 60 ? copy.reason.rain : '';
  const advice = (decision === 'WATER' ? copy.water : copy.wait)
    .replace('{crop}', crop).replace('{score}', score).replace('{level}', level.toLowerCase()).replace('{rain}', rainProbability).replace('{reason}', reason);
  return { ...copy, advice, skipped: copy.skipped, excess: copy.excess };
}
