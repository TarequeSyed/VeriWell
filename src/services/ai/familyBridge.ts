import { EvidenceCard } from '../../types';
import { Language } from '../../i18n/translations';

/**
 * Generate a culturally respectful, empathetic WhatsApp counter-message
 * that family members can share without shaming elders.
 */
export function generateFamilyForwardMessage(
  claimText: string,
  evidenceCard: EvidenceCard,
  tone: 'respectful' | 'casual' | 'gentle_warning' = 'respectful',
  lang: Language = 'en'
): string {
  if (lang === 'hi') {
    const greeting = tone === 'respectful'
      ? "नमस्ते आदरणीय परिवारजनों 🙏,"
      : tone === 'casual'
      ? "नमस्ते सभी को,"
      : "प्रिय परिवारजनों,";

    const title = evidenceCard.title_hi || evidenceCard.title;
    const org = evidenceCard.organization_hi || evidenceCard.organization;
    const paraphrase = evidenceCard.paraphrase_hi || evidenceCard.paraphrase;

    return `${greeting}

हाल ही में परिवार ग्रुप में यह स्वास्थ्य नुस्खा देखा: "${claimText}"। स्वास्थ्य के लिए प्राकृतिक उपाय ढूंढना बहुत स्वाभाविक है।

मैंने इस बारे में ${org} के आधिकारिक मेडिकल दिशानिर्देश ("${title}") देखे:
• ${paraphrase}

डॉक्टरों का कहना है कि चालू दवाइयों को अचानक बंद कर देने से ब्लड शुगर या बीपी बहुत खतरनाक स्तर तक पहुंच सकता है। घरेलू नुस्खे खान-पान का हिस्सा हो सकते हैं, पर वे डॉक्टर की दवा का विकल्प नहीं हैं।

कृपया कोई भी बदलाव करने से पहले अपने डॉक्टर से सलाह जरूर लें:
${evidenceCard.url}

यह संदेश केवल परिवार के सभी सदस्यों के स्वास्थ्य और सुरक्षा की फिक्र में साझा किया गया है! 🙏❤️`;
  }

  // English fallback
  const greeting = tone === 'respectful' 
    ? "Namaste / Hello family," 
    : tone === 'casual' 
    ? "Hey everyone," 
    : "Dear family members,";

  return `${greeting}

Thank you for sharing this health forward about: "${claimText}". It's understandable to look for natural or easier alternatives.

I checked official clinical guidelines from the ${evidenceCard.organization} regarding this:
• ${evidenceCard.paraphrase}

Doctors caution that stopping prescribed medicines suddenly can cause serious complications like dangerous blood sugar spikes or kidney issues. Natural herbs can be part of a healthy diet, but they cannot replace medications without a doctor's guidance.

Please check with our doctor before making any changes:
${evidenceCard.url}

Sending this with love and care for everyone's health! 🙏`;
}

/**
 * Generate a printable/copyable 3-point Doctor Discussion Card
 */
export function generateDoctorVisitChecklist(
  topic: string,
  userConcern: string,
  evidenceSummary: string,
  lang: Language = 'en'
): string[] {
  if (lang === 'hi') {
    return [
      `"डॉक्टर साहब, मैंने हाल ही में एक वायरल नुस्खा देखा जिसमें दावा था कि ${topic}। कृपया बताएं कि मेरी वर्तमान रिपोर्ट और स्थिति के अनुसार यह कितना सही या गलत है?"`,
      `"मुझे दवाइयों को लेकर यह चिंता हो रही है: '${userConcern.slice(0, 100)}'। क्या कुछ जांच या टेस्ट किए जा सकते हैं जिससे मुझे अपनी दवा और गुर्दों की सुरक्षा पर भरोसा हो सके?"`,
      `"कोई भी घरेलू काढ़ा, मेथी का पानी या सप्लीमेंट लेने से पहले, क्या वे मेरी मौजूदा दवाओं के साथ पूरी तरह सुरक्षित हैं?"`
    ];
  }

  return [
    `"Doctor, I recently saw a popular forward claiming that ${topic}. Could you clarify how this applies to my specific health numbers?"`,
    `"I've been feeling worried about ${userConcern.slice(0, 100)}. Clinical guidelines note: '${evidenceSummary.slice(0, 120)}...'. Are there tests or monitoring steps we can do so I feel more confident about my treatment?"`,
    `"Before considering any dietary supplements or herbal teas, which ones are safe to take alongside my current prescriptions?"`
  ];
}
