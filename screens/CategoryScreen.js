// screens/CategoryScreen.js
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useDeviceType } from '../utils/Device';

// --- ЛОКАЛЬНЫЕ КАРТИНКИ (для заглушек) ---
const imgPP = require('../assets/pp.png');
const imgCake = require('../assets/cake.png');
const imgSalad = require('../assets/salad.png');
const imgDrink = require('../assets/drink.png');
const imgZakuski = require('../assets/zakuski.png');
const imgSousi = require('../assets/sousi.png');

// --- СТРУКТУРА ДАННЫХ ПО КАТЕГОРИЯМ (ВОССТАНОВЛЕНА) ---
const CATEGORY_DATA = {
  'ПП рецепты': [
    { id: 'pp1', title: 'Салат с киноа', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN2mco6xwgvyZL9oRDCB0f4w2Pvk4c8gzZTISuk7mF-mM1rOD4oIC6zZwsOtJT8PNSXnnn15BPLVsUMiBGmF9bS42NA&expires=1794602416628' } },
    { id: 'pp2', title: 'Котлеты из куриной грудки', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN2KiOyl9AedmukcYJfyRNahmudfnX9ecCY84Ut-e7LGi5r289Wm0Vng5HB7YOwrrmaIa0IhpiRagU2_EKNui7mmcys&expires=1794608427152' } },
    { id: 'pp3', title: 'Булгур с курицей и овощами', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN04hniYHe7tclF-T3hPOWlGG-6qS63e73a6RAHgykH5Ol7Oh2339uctCZDx84hLHnyQMUywJ5FPoP2n3uE2wIIa7v4&expires=1794602646844' } },
    { id: 'pp4', title: 'Чашушули', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3zTs_1XRnjr4BuC7Bu6ybPnstpHwR55visnapIqwVLFqG7a0JZFc6JKrZJhlQ8JAyEDc6xq8eLVQaF26Rgt2-2smU&expires=1794603477613' } },
    { id: 'pp5', title: 'Спагетти из кабачка с помидорами', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0iNWRWturoo5ajozyAfnmARXB0GtWBVHCeGcSdxl68vX0bZX8zofYsfkk8XoEIXkud4Q1K7S8Kl-_WqpZPmHbvngc&expires=1794623841965' } },
    { id: 'pp6', title: 'Жракое', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN32V-7vCgJJ-i0X2O2fE5stQDvHKQ9kk9GuAEfrwxqIiOccIBT-iJHdaTPNf26Hmm1CCDJP8RkoPb8MV6thrjdQkqU&expires=1794619510986' } },
    { id: 'pp7', title: 'Ленивые вареники с творогом', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0GZXdjsMn770ADC5vPnlKfWYXDK_5jbJMwuXAY9otRcwL2N-nqPL1YDt73YrvXpUrmR047ibLnjiQ7vqAdXjvr7gg&expires=1794610565081' } },
    { id: 'pp8', title: 'Гаспачо', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN2m343DUs4KjWEl3tt6DvA3M61HHKyR2z63-VX_vRzoZ6Fk_xw19FzI2Gi90fJuE4A65WowuApMQKd_lCTFlGM44Po&expires=1794612128550' } },
    { id: 'pp9', title: 'Горбуша на пару', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN2q0o84rjSz9bRgdTnpSWJsDS-M30eCsfTie3lge8sgQk9K9f3fdydzlXRHqNCSnwtjsMNUJeVIczP3F9tP3MopOzs&expires=1794623344917' } },
    { id: 'pp10', title: 'Овсяное печенье', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN37TAVyCb-R5oQoUiN20BWW7_VoaJyM213hgIXxKQnq-hayTZcLj1YLNcNWOARRVv1ziA8LOe0KNcJSf2k5l0Ub4Y4&expires=1794604130102' } },
  ],
  'Выпечка': [
    { id: 'cake1', title: 'Венские вафли', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN31WOu1sbk5HhZyIi0zdE66lkh8bFo20LE4ZrzGHPJHgSMV7roBfuEqn1SWO--aeJocYqp1N9aPlC3_MJQIqeX8x3g&expires=1794608501257' } },
    { id: 'cake2', title: 'Пахлава', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0NLz8CbIAwcVg6Aw5PDCpNjldo-R2f2QHP43jm6zZtcdhFnl4LAa_9IRn4fntix_UPjeEc11pYsovC7SLGOUB7iEo&expires=1794622012871' } },
    { id: 'cake3', title: 'Яблочный штрудель', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3D8pOGAOMGRYDhs91ZSlCmDBmgMePpebTTXUvel_xrWO1YHekpppdfu-ZiCSmd26jey5Zx5kXRsyhxQViBl4YpZ0A&expires=1794603962995' } },
    { id: 'cake4', title: 'Чизкейк Нью-Йорк', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0wbBsMxM3W2KFiL4svATM22BwR47sVLpzeXr0Zgw5o_EcvX6OSDU1ePEvVM7nRoK2UXvEkbIqoFL8bKh9RlzYDNBI&expires=1794608450670' } },
    { id: 'cake5', title: 'Имбирное печенье', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN1Zg-7pRXpGn6V2H-TsQwlRjUJQfTfUw1hy_apLLXAFGPmM9xkTuwx4g4NDywz7FBFeg5C1kjXCQ2SkXurqFBh8gHU&expires=1794619639439' } },
    { id: 'cake6', title: 'Красный бархат', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0KAMEtxeX4P8p7JODIoZ7T8iL3L528J2NdXmy1FYo-0uCgKD_G_1sBkGVaL0oTcdLxU1MmK2ctVRz1rJ_EvBAaB7c&expires=1794606110754' } },
    { id: 'cake7', title: 'Шоколадные маффины', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN2H-sDOexhraeiwLCx7P810c0w7YSIvbUCItDlpqhMauLLCgggAFFe_3vZpLcSfc0yeMncvOMRR5T9zqr5c91kWklY&expires=1794620151759' } },
    { id: 'cake8', title: 'Оладья', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN2Zku_lcS7VFw8nURhHXy6o1lg7K53FjQ8kGCkYvaHulDOS28eq6YZ82aWNuOwf7_2uZRm-zxH2SfNeiSMJQGmRgTA&expires=1794608143572' } },
    { id: 'cake9', title: 'Муравейник', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN1z8roWb-Sj0nlv8hYOocDjenxduX1yfuRArTz5mX-FVfCx0uN-XI8t6FBrVUxhUcdd6pjSphxFHaZf3yqOvcwpl88&expires=1794613498741' } },
    { id: 'cake10', title: 'Синнабоны', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN1zcT73Dv7VwwKgMNHVVRtnYgOacXCNP7jY0nlrS3MmyFJszkCqPvjpPkaGIZOaKS2dqFAFfNVHSGrCRxYY35wXZBc&expires=1794610187316' } },
  ],
  'Салаты': [
    { id: 'salad1', title: 'Цезарь', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN16v-pgR9YwY4qK8-yKXt_oJmUN4FtHJauLFUQ5Ca7ECAnPaIdkKtE3wQKJXrnJ9RbCpL96qCYUmFUT4eNzX-bwe0o&expires=1794627301987' } },
    { id: 'salad2', title: 'Крабовый', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN1IiJmXx0oCMDOMzbDkxI6IZ5qnov_I5lgp1bwRGOUKNCkQaT26FpWL8r-nyHzsMT7jpAHEfRIh-MJyJOSYTyUSqik&expires=1794626459959' } },
    { id: 'salad3', title: 'Греческий', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN35XKZEgn_T6WX7RCS3jM52L00lEuwLfDwJwRthWJPUP5vlEKT_90oE6GborMqNZmaq2mC-fYmX_1FBZTAoFQAORSY&expires=1794626935362' } },
    { id: 'salad4', title: 'Оливье', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN02Z2KlaN3bWoI7ClIM2nnaD1OHkUuvlThZwlyT3KNZZaCaA4s_zkhwzG-wYAzZcW0AQpCBn8MHrMzF_glKO_ubd_I&expires=1794613760514' } },
    { id: 'salad5', title: 'Мимоза', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3D021Fax3OzGBtOh-nEWcolRBeRoP4li5nbjwRgD8DgdbBpbwINQrpCQUhFpPZ4BfwaYMwInPONWEa8AyJH_rJMAM&expires=1794625819205' } },
    { id: 'salad6', title: 'Селедка под шубой', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3_rEO-CAt4YQNv7tE7Uiah5rYN4jdJxaXJtYVlZzVZqQ8W3042-KaWOcsT_-dGDbwE4f1A-DzoLWHt8IK0u-055oI&expires=1794624948305' } },
    { id: 'salad7', title: 'Мужской каприз', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3mOUikUY3FBXikM1N1drC98wV_SST7XJIOe1TPdrWrCr6eZjuQS7sHxJMaUQSoFPr7Yt3lLRDetG-WECOPwDNU2VA&expires=1794625917219' } },
    { id: 'salad8', title: 'Нисуаз', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN30KFtYIlw_SCokh6aTuzlMGjxqUgW319bCAWfOrBygk8FQhQhOrHNVQ0cIRyMPVgcz8-wrJVo022MkG_ZJO4iRnKs&expires=1794623974996' } },
    { id: 'salad9', title: 'Винегрет', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0c-sOCoaxBwPAiW2s3cYM0TH50JQmg6EiSJvCXeoo7cVaYGQakWxYEH1er8uJLU-SbGbowEs6FlpCa-_AOrQxm7mU&expires=1794609723091' } },
    { id: 'salad10', title: 'Капрезе', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3mb-Qo4k5DwHXnzFI7DgOmXk0nC8-La8Du-4_BvK2Sel19fv_qOrIT7V_aKOPECeoLT3WRN3zvDQRZxACBeziDG_Y&expires=1794612835475' } },
  ],
  'Напитки': [
    { id: 'drink1', title: 'Смузи', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0alRCMhvU8sufU1770RXFiYFpAXNRM8oLnK3HjFVuKwAgyyowvcN4CPXVj1pix-UQC2yYKgTDAt7g_zhi-aZzjY-w&expires=1794623659962' } },
    { id: 'drink2', title: 'Лимонад', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0lFPerB-8MLE9xmLyWOgJ3zA5pfvnDWrZNZ_eBhNBAus2CjE4eqL5dtX84Mx2DTh91JsMy7WCag8upBm-ZeSEsW4M&expires=1794626322017' } },
    { id: 'drink3', title: 'Сливочное пиво', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3-owJ-ZfY3JkpCpratuX5un75FVpym4CBBzVM6w-gYW83WAgDYCKvgQKDy5eBplkCPxYoXkmlBYQ2X3XSGiroM-Ro&expires=1794629656443' } },
    { id: 'drink4', title: 'Голубая лагуна', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN07oITtiLnXEurxP__lo6rsTN7ucmbHJdXiG79VBAmw00RnoH25-aV0K78zWgrOXlU1fgEGFMclpZKxvnaAVJM-R0c&expires=1794625020974' } },
    { id: 'drink5', title: 'Яблочный компот', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0zIU9-8ClkibxNEt89oAUywWZDNknvXIXBzAd1LIx2P9C2Af3Y0O2zR3xg2FStGoAawTZZP0U16E2tPN0wz2CcWjk&expires=1794622929795' } },
    { id: 'drink6', title: 'Чай с мятой', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN06XHBUIj4YxdHgnXc8VXYJEJRdwVLCMNicT_dGEeMNYEhYtwTUwZYjvv4J7fxzmtRp9-VHruLSn49K97zF44jfYUs&expires=1794626100208' } },
    { id: 'drink7', title: 'Калмык чай', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN2kPo-3mJXbW-MZb2zJP50I94iUYbreUHWA8lTBkBi1nEfwYCjUOcr-aqzUzCjE3dg0B3skN0mvhqc-U75CJnI_y8o&expires=1794623278443' } },
    { id: 'drink8', title: 'Глинтвейн', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0WKOYSXrbve3PU9sXJTjPRBsPjj2-tK-nz901pmbJi4nAPGKxD0b8rQeqRoRsvTp_3HnLuoW6S2HOzzvA858sK97E&expires=1794617127621' } },
    { id: 'drink9', title: 'Кровавая Мэри', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0kiWnIfmOMKJwT53k4YXZTNVrukQ5d9ArgQV02tyuTZhIDxTH-exqx5hZbZJ9Xw4Dws4z8q0JwOKtsFsfdq1Uwdqo&expires=1794629251775' } },
    { id: 'drink10', title: 'Лавандовый раф', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN1UgXJpE4C2VMfSKu9Qj47Amu5xwgUr82kJB_xEDBBQfr13z5gt_OvXflEEGjhfaXsubnwpXmPiUTmHgx9Kr3Gl3OA&expires=1794630386670' } },
  ],
  'Закуски': [
    { id: 'zak1', title: 'Брускетта', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0usYsuyO8LZmYbnz6lp1ZsXGygzSy9Y_rOMXdKgMpVzjMiOXFAYBnZvNZKQlDvjRnlSYzeQWrhAU53LVKOUCavXao&expires=1794626196850' } },
    { id: 'zak2', title: 'Канапе', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0v9regTCFcdvlkY4FpkDC1YC3gGDj9rT_fge2WSZ7bi8cEjm5t11bSHRmAyRINccliWHQm8-p-bNsBHWLC-Fe0OlI&expires=1794630136476' } },
    { id: 'zak3', title: 'Фаршированные яйца', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN2_3evjYpSrLtV2mOb6hPvBMCAapRisZiOxgD1zgKmgvMgcmmDHO_TfaInZgd-Lgokv1HJHQcKfdIIYEycea7ltpXk&expires=1794621988166' } },
    { id: 'zak4', title: 'Рулетики из ветчины', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3eztMnGKe7w6_FyI3fIcxJgLDayQwQ-RLQRVYK2-Hp5YKHZOzt5BYobERzBv1zso2cLZWSb0YqmGqmNpfrxpN-kHY&expires=1794616892128' } },
    { id: 'zak5', title: 'Тарталетки с икрой', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN1Q5KnXz8M_lAHuRO3TsKywwJdfNtuKSFZ_K_NhrI6QiWm_zbbtnrYeMa0uf54Ya_tgk2WKbvZMPGWj8K3xpjmc-sw&expires=1794628854594' } },
    { id: 'zak6', title: 'Сырные шарики', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3QCoklkp1LQjtFp3ZkKRzU949vNhRYI9kkPPVETIbJuMhp0tWXZKJen1JZBsVscH3vd2uvGYlaAIkmCXaoufVAiHA&expires=1794612047656' } },
  ],
  'Соусы': [
    { id: 'sous1', title: 'Песто', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN254Qv52tp2FxLrf70GH9veenRpcXnhFpJYKW9BMopRyteK_6S2yRc9v8u-wF5R2FYmnFJwHGT2SsdO4RM8hR0B9bU&expires=1794631118828' } },
    { id: 'sous2', title: 'Тартар', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN0OFwG0-tMY2UFzwOpcddAyDbFc3fE-W-tNgnYN6nQfj-Yo5QMEpzryK7nh7fr1wlKSe1DUBNWZ3SNpRphhz373W1o&expires=1794632511590' } },
    { id: 'sous3', title: 'Аджика', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3XDmVgOiUP3kAIHM_zoJQw-ZTJxltEWCtXgi8JARrGUd2EiB8kZ76F9nSRvkinCY7uIpn4eKO_B4WoVeDpdFqTS2E&expires=1794618144008' } },
    { id: 'sous4', title: 'Бешамель', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3zapMHgvT_oUpZVcktaI19j1aDYnhOZ33_Ex5kB9pdDrwnBMLDPkmCFNSb6KqPHj-b-XQ2XR-qa1yTOGVeC5s3_GM&expires=1794626507991' } },
    { id: 'sous5', title: 'Гуакамоле', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN16AHev1niVa-z1liU2Wk4-xnv5cKsKqKcfFeWJXpXYEyJIQ3I_mCqO7Ak3fwbHEMDvAJPMwEFEh032cUe1KqpNrnM&expires=1794618707410' } },
    { id: 'sous6', title: 'Болоньезе', image: { uri: 'https://i.oneme.ru/i?r=B09HQN0Qr3SEKX3_pN3oj5y5cITONgMhGoA1rVf-KlHMFWE8Rt4Dj_qRokI_cbZV7wYzXdNI64onbU1unzcbKBraNAADC72t7Jb6k-z3mqU&expires=1794612968574' } },
  ],
};

export default function CategoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isTablet } = useDeviceType();
  const { category } = route.params || { category: 'ПП рецепты' };

  const recipesList = CATEGORY_DATA[category] || [];

  // Динамическая ширина карточки: 3 колонки на планшете, 2 на телефоне
  const cardWidth = isTablet ? '31%' : '48%';

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{category}</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.gridContainer}>
          {recipesList.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.recipeCard, { width: cardWidth }]}>
              <Image source={item.image} style={styles.recipeImage} resizeMode="cover" />
              <Text style={styles.recipeTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          {recipesList.length === 0 && (
            <Text style={styles.emptyText}>В этой категории пока нет блюд...</Text>
          )}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 50, maxWidth: 1000, alignSelf: 'center', width: '100%' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 22, color: COLORS.PRIMARY, fontWeight: 'bold' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  recipeCard: { 
    backgroundColor: '#DCE6CC', 
    borderRadius: 15, 
    padding: 10, 
    marginBottom: 15,
    alignItems: 'center',
  },
  recipeImage: { 
    width: '100%', 
    height: 120, 
    borderRadius: 10, 
    marginBottom: 8,
    backgroundColor: '#E0E0E0',
  },
  recipeTitle: { 
    color: COLORS.PRIMARY, 
    fontSize: 14, 
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    width: '100%',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.PRIMARY,
    opacity: 0.6,
  }
});