const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');

// ── Full translation object for all pages ────────────────────────────────────
const translations = {
  en: {
    about: {
      ourStory: "Our Story",
      ourStorySubtitle: "A legacy of craftsmanship. We weave tales of tradition into every silhouette, redefining modern ethnic wear.",
      artisanTitle: "The Artisan's Touch",
      artisanDesc: "Every SIDHANT piece is a testament to the skill of our master artisans. By blending generations-old techniques with contemporary aesthetics, we create garments that are not just worn, but cherished. We source the finest silks, velvets, and hand-loomed cottons to ensure an unparalleled experience of luxury.",
      visionTitle: "A Vision of Elegance",
      visionDesc: "Our design philosophy is rooted in the idea that true elegance lies in the details. From the intricate zardozi embroidery to the perfect drape of a dupatta, our focus is always on creating a harmonious balance between opulence and grace.",
      joinLegacy: "Join The Legacy",
      joinLegacyQuote: "Discover the art of fine dressing. Welcome to the world of SIDHANT."
    },
    contact: {
      title: "Contact Us",
      subtitle: "We are here to assist you with any inquiries regarding our collections, bespoke orders, or general questions.",
      headquarters: "Headquarters",
      address: "C-97, 4th Floor, Sumel Business Park-2, Kankaria Road, Behind Vanijya Bhavan, Sherkotda, Ahmedabad, Gujarat, 380002, India",
      connect: "Connect",
      connectDetails: "Email: support.samarpan@gmail.com\nPhone: +91 9913679022",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      sendMessage: "Send Message"
    },
    gateway: {
      welcomeTo: "Welcome to Sidhant",
      heading: "Ahmedabad's Premier Design House.",
      subheading: "Redefining Modern Heritage.",
      retailTitle: "Retail Curators",
      retailDesc: "Exclusive access for boutique owners & private clients seeking unique pieces.",
      wholesaleTitle: "Bespoke Wholesale",
      wholesaleDesc: "Dedicated partnerships for high-volume allocations and global distributors.",
      enterPortal: "Enter Portal"
    }
  },
  fr: {
    about: {
      ourStory: "Notre Histoire",
      ourStorySubtitle: "Un héritage de savoir-faire. Nous tissons des récits de tradition dans chaque silhouette, redéfinissant la mode ethnique moderne.",
      artisanTitle: "La Touche de l'Artisan",
      artisanDesc: "Chaque pièce SIDHANT témoigne du talent de nos maîtres artisans. En mêlant des techniques ancestrales à une esthétique contemporaine, nous créons des vêtements qui ne se portent pas seulement, mais se chérissent.",
      visionTitle: "Une Vision de l'Élégance",
      visionDesc: "Notre philosophie de design est ancrée dans l'idée que la vraie élégance réside dans les détails. De la broderie zardozi aux drapés parfaits, notre objectif est de créer un équilibre harmonieux entre opulence et grâce.",
      joinLegacy: "Rejoindre l'Héritage",
      joinLegacyQuote: "Découvrez l'art de s'habiller avec raffinement. Bienvenue dans le monde de SIDHANT."
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour répondre à toutes vos questions concernant nos collections, commandes sur mesure ou questions générales.",
      headquarters: "Siège Social",
      address: "C-97, 4e étage, Sumel Business Park-2, Kankaria Road, Derrière Vanijya Bhavan, Sherkotda, Ahmedabad, Gujarat, 380002, Inde",
      connect: "Nous Contacter",
      connectDetails: "Email: support.samarpan@gmail.com\nTél: +91 9913679022",
      name: "Nom",
      email: "E-mail",
      subject: "Sujet",
      message: "Message",
      sendMessage: "Envoyer le Message"
    },
    gateway: {
      welcomeTo: "Bienvenue chez Sidhant",
      heading: "La Maison de Design Premier d'Ahmedabad.",
      subheading: "Redéfinir le Patrimoine Moderne.",
      retailTitle: "Conservateurs de Vente au Détail",
      retailDesc: "Accès exclusif pour les propriétaires de boutiques et les clients privés recherchant des pièces uniques.",
      wholesaleTitle: "Vente en Gros Sur Mesure",
      wholesaleDesc: "Partenariats dédiés pour les allocations à grand volume et les distributeurs mondiaux.",
      enterPortal: "Entrer dans le Portail"
    }
  },
  es: {
    about: {
      ourStory: "Nuestra Historia",
      ourStorySubtitle: "Un legado de artesanía. Tejemos historias de tradición en cada silueta, redefiniendo la moda étnica moderna.",
      artisanTitle: "El Toque del Artesano",
      artisanDesc: "Cada pieza SIDHANT es un testimonio de la habilidad de nuestros maestros artesanos. Al combinar técnicas milenarias con estética contemporánea, creamos prendas que no sólo se usan, sino que se atesoran.",
      visionTitle: "Una Visión de Elegancia",
      visionDesc: "Nuestra filosofía de diseño se basa en la idea de que la verdadera elegancia reside en los detalles. Desde el intrincado bordado zardozi hasta el drapeado perfecto, nuestro objetivo es crear un equilibrio armonioso entre opulencia y gracia.",
      joinLegacy: "Únete al Legado",
      joinLegacyQuote: "Descubre el arte del buen vestir. Bienvenido al mundo de SIDHANT."
    },
    contact: {
      title: "Contáctenos",
      subtitle: "Estamos aquí para asistirle con cualquier consulta sobre nuestras colecciones, pedidos a medida o preguntas generales.",
      headquarters: "Sede",
      address: "C-97, 4to Piso, Sumel Business Park-2, Kankaria Road, Detrás de Vanijya Bhavan, Sherkotda, Ahmedabad, Gujarat, 380002, India",
      connect: "Conectar",
      connectDetails: "Email: support.samarpan@gmail.com\nTeléfono: +91 9913679022",
      name: "Nombre",
      email: "Correo Electrónico",
      subject: "Asunto",
      message: "Mensaje",
      sendMessage: "Enviar Mensaje"
    },
    gateway: {
      welcomeTo: "Bienvenido a Sidhant",
      heading: "La Casa de Diseño Premier de Ahmedabad.",
      subheading: "Redefiniendo el Patrimonio Moderno.",
      retailTitle: "Curadores de Retail",
      retailDesc: "Acceso exclusivo para propietarios de boutiques y clientes privados que buscan piezas únicas.",
      wholesaleTitle: "Venta al Por Mayor a Medida",
      wholesaleDesc: "Asociaciones dedicadas para asignaciones de alto volumen y distribuidores globales.",
      enterPortal: "Ingresar al Portal"
    }
  },
  hi: {
    about: {
      ourStory: "हमारी कहानी",
      ourStorySubtitle: "शिल्पकला की एक विरासत। हम हर सिल्हूट में परंपरा की कहानियां बुनते हैं, आधुनिक जातीय पहनावे को पुनः परिभाषित करते हुए।",
      artisanTitle: "कारीगर का स्पर्श",
      artisanDesc: "हर SIDHANT पीस हमारे मास्टर कारीगरों के कौशल का प्रमाण है। पीढ़ियों पुरानी तकनीकों को समकालीन सौंदर्यशास्त्र के साथ मिलाकर, हम ऐसे परिधान बनाते हैं जो केवल पहने नहीं जाते, बल्कि संजोए जाते हैं।",
      visionTitle: "सुंदरता का दृष्टिकोण",
      visionDesc: "हमारा डिज़ाइन दर्शन इस विचार पर आधारित है कि सच्ची सुंदरता विवरणों में निहित है। जटिल जरदोज़ी कढ़ाई से लेकर दुपट्टे की सही ड्रेपिंग तक, हमारा ध्यान हमेशा ऐश्वर्य और अनुग्रह के बीच सामंजस्यपूर्ण संतुलन बनाने पर होता है।",
      joinLegacy: "विरासत से जुड़ें",
      joinLegacyQuote: "बेहतरीन पहनावे की कला खोजें। SIDHANT की दुनिया में आपका स्वागत है।"
    },
    contact: {
      title: "संपर्क करें",
      subtitle: "हम आपके संग्रहों, बेस्पोक ऑर्डर, या सामान्य प्रश्नों के बारे में किसी भी पूछताछ में सहायता करने के लिए यहां हैं।",
      headquarters: "मुख्यालय",
      address: "C-97, चौथी मंजिल, सुमेल बिजनेस पार्क-2, कांकरिया रोड, वणिज्य भवन के पीछे, शेरकोटड़ा, अहमदाबाद, गुजरात, 380002, भारत",
      connect: "संपर्क",
      connectDetails: "ईमेल: support.samarpan@gmail.com\nफोन: +91 9913679022",
      name: "नाम",
      email: "ईमेल",
      subject: "विषय",
      message: "संदेश",
      sendMessage: "संदेश भेजें"
    },
    gateway: {
      welcomeTo: "सिधांत में आपका स्वागत है",
      heading: "अहमदाबाद का प्रीमियर डिज़ाइन हाउस।",
      subheading: "आधुनिक विरासत को पुनः परिभाषित करना।",
      retailTitle: "रिटेल क्यूरेटर",
      retailDesc: "अद्वितीय पीस खोजने वाले बुटीक मालिकों और निजी ग्राहकों के लिए विशेष पहुंच।",
      wholesaleTitle: "बेस्पोक होलसेल",
      wholesaleDesc: "उच्च-मात्रा आवंटन और वैश्विक वितरकों के लिए समर्पित साझेदारी।",
      enterPortal: "पोर्टल में प्रवेश करें"
    }
  },
  ar: {
    about: {
      ourStory: "قصتنا",
      ourStorySubtitle: "إرث من الحرفية. نحن ننسج قصص التقليد في كل صورة ظلية، مُعيدين تعريف الأزياء العرقية الحديثة.",
      artisanTitle: "لمسة الحرفي",
      artisanDesc: "كل قطعة SIDHANT هي شهادة على مهارة حرفيينا الماهرين. من خلال الجمع بين التقنيات التي توارثتها الأجيال والجماليات المعاصرة، نصنع ملابس لا تُرتدى فحسب، بل تُقدَّر.",
      visionTitle: "رؤية من الأناقة",
      visionDesc: "تتجذر فلسفتنا التصميمية في فكرة أن الأناقة الحقيقية تكمن في التفاصيل. من التطريز الزردوزي المعقد إلى التدرج المثالي للدوباتا، يتمحور تركيزنا دائماً على تحقيق توازن متناغم بين الترف والجمال.",
      joinLegacy: "انضم إلى الإرث",
      joinLegacyQuote: "اكتشف فن ارتداء الملابس الرائعة. مرحباً بك في عالم SIDHANT."
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "نحن هنا لمساعدتك في أي استفسارات تتعلق بمجموعاتنا أو الطلبات المخصصة أو الأسئلة العامة.",
      headquarters: "المقر الرئيسي",
      address: "C-97، الطابق الرابع، سوميل بيزنس بارك-2، طريق كانكاريا، خلف فانيجيا بهافان، شيركوتدا، أحمد آباد، غوجارات، 380002، الهند",
      connect: "التواصل",
      connectDetails: "البريد الإلكتروني: support.samarpan@gmail.com\nالهاتف: +91 9913679022",
      name: "الاسم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      sendMessage: "إرسال الرسالة"
    },
    gateway: {
      welcomeTo: "مرحباً بك في سيدهانت",
      heading: "دار التصميم الأولى في أحمد آباد.",
      subheading: "إعادة تعريف التراث الحديث.",
      retailTitle: "أمناء التجزئة",
      retailDesc: "وصول حصري لأصحاب المتاجر والعملاء الخاصين الباحثين عن قطع فريدة.",
      wholesaleTitle: "الجملة المخصصة",
      wholesaleDesc: "شراكات مخصصة لتخصيصات الحجم الكبير والموزعين العالميين.",
      enterPortal: "الدخول إلى البوابة"
    }
  },
  de: {
    about: {
      ourStory: "Unsere Geschichte",
      ourStorySubtitle: "Ein Erbe des Handwerks. Wir weben Geschichten der Tradition in jede Silhouette und definieren moderne ethnische Mode neu.",
      artisanTitle: "Die Berührung des Handwerkers",
      artisanDesc: "Jedes SIDHANT-Stück ist ein Zeugnis des Könnens unserer Meisterhandwerker. Durch die Verbindung von generationenalten Techniken mit zeitgenössischer Ästhetik schaffen wir Kleidungsstücke, die nicht nur getragen, sondern geschätzt werden.",
      visionTitle: "Eine Vision von Eleganz",
      visionDesc: "Unsere Designphilosophie basiert auf der Idee, dass wahre Eleganz in den Details liegt. Von der aufwendigen Zardozi-Stickerei bis zum perfekten Drapieren eines Dupatta liegt unser Fokus stets auf einem harmonischen Gleichgewicht zwischen Opulenz und Anmut.",
      joinLegacy: "Dem Erbe Beitreten",
      joinLegacyQuote: "Entdecken Sie die Kunst des feinen Anziehens. Willkommen in der Welt von SIDHANT."
    },
    contact: {
      title: "Kontakt",
      subtitle: "Wir helfen Ihnen gerne bei Anfragen zu unseren Kollektionen, maßgeschneiderten Bestellungen oder allgemeinen Fragen.",
      headquarters: "Hauptsitz",
      address: "C-97, 4. Etage, Sumel Business Park-2, Kankaria Road, hinter Vanijya Bhavan, Sherkotda, Ahmedabad, Gujarat, 380002, Indien",
      connect: "Verbinden",
      connectDetails: "E-Mail: support.samarpan@gmail.com\nTelefon: +91 9913679022",
      name: "Name",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      sendMessage: "Nachricht Senden"
    },
    gateway: {
      welcomeTo: "Willkommen bei Sidhant",
      heading: "Ahmedabads führendes Designhaus.",
      subheading: "Modernes Erbe neu definieren.",
      retailTitle: "Einzelhandels-Kuratoren",
      retailDesc: "Exklusiver Zugang für Boutique-Inhaber und Privatkunden, die einzigartige Stücke suchen.",
      wholesaleTitle: "Maßgeschneiderter Großhandel",
      wholesaleDesc: "Dedizierte Partnerschaften für Großvolumen-Allokationen und globale Händler.",
      enterPortal: "Portal Betreten"
    }
  },
  it: {
    about: {
      ourStory: "La Nostra Storia",
      ourStorySubtitle: "Un'eredità di artigianalità. Tessiamo storie di tradizione in ogni silhouette, ridefinendo l'abbigliamento etnico moderno.",
      artisanTitle: "Il Tocco dell'Artigiano",
      artisanDesc: "Ogni pezzo SIDHANT è una testimonianza dell'abilità dei nostri maestri artigiani. Unendo tecniche di generazioni a un'estetica contemporanea, creiamo indumenti non solo indossati, ma custoditi con cura.",
      visionTitle: "Una Visione di Eleganza",
      visionDesc: "La nostra filosofia di design si basa sull'idea che la vera eleganza risiede nei dettagli. Dai ricami zardozi alla piega perfetta di un dupatta, il nostro obiettivo è creare un equilibrio armonioso tra opulenza e grazia.",
      joinLegacy: "Unirsi all'Eredità",
      joinLegacyQuote: "Scopri l'arte del vestire bene. Benvenuto nel mondo di SIDHANT."
    },
    contact: {
      title: "Contattaci",
      subtitle: "Siamo qui per assisterti in qualsiasi domanda riguardante le nostre collezioni, ordini su misura o domande generali.",
      headquarters: "Sede Principale",
      address: "C-97, 4° Piano, Sumel Business Park-2, Kankaria Road, Dietro Vanijya Bhavan, Sherkotda, Ahmedabad, Gujarat, 380002, India",
      connect: "Connettiti",
      connectDetails: "Email: support.samarpan@gmail.com\nTelefono: +91 9913679022",
      name: "Nome",
      email: "Email",
      subject: "Oggetto",
      message: "Messaggio",
      sendMessage: "Invia Messaggio"
    },
    gateway: {
      welcomeTo: "Benvenuto da Sidhant",
      heading: "La Casa di Design Principale di Ahmedabad.",
      subheading: "Ridefinire il Patrimonio Moderno.",
      retailTitle: "Curatori del Retail",
      retailDesc: "Accesso esclusivo per proprietari di boutique e clienti privati in cerca di pezzi unici.",
      wholesaleTitle: "Vendita all'Ingrosso su Misura",
      wholesaleDesc: "Partnership dedicate per allocazioni di grandi volumi e distributori globali.",
      enterPortal: "Entra nel Portale"
    }
  },
  ja: {
    about: {
      ourStory: "私たちの物語",
      ourStorySubtitle: "職人技の遺産。私たちはすべてのシルエットに伝統の物語を織り込み、現代のエスニックウェアを再定義します。",
      artisanTitle: "職人の技",
      artisanDesc: "SIDHANTの各ピースは、熟練した職人の技の証です。世代を超えた技術と現代的な美学を融合させることで、単に着用されるだけでなく、大切にされる衣装を作ります。",
      visionTitle: "エレガンスのビジョン",
      visionDesc: "私たちのデザイン哲学は、真のエレガンスは細部に宿るという考えに基づいています。繊細なザルドジ刺繍からドゥパッタの完璧なドレープまで、豪華さと優雅さの調和のとれたバランスを生み出すことに常に焦点を当てています。",
      joinLegacy: "遺産に参加する",
      joinLegacyQuote: "上品な服装の芸術を発見してください。SIDHANTの世界へようこそ。"
    },
    contact: {
      title: "お問い合わせ",
      subtitle: "コレクション、ビスポークオーダー、または一般的なご質問に関するお問い合わせをお手伝いします。",
      headquarters: "本社",
      address: "C-97、4階、スメルビジネスパーク-2、カンカリアロード、ヴァニジャバヴァンの裏、シェルコトダ、アフマダーバード、グジャラート、380002、インド",
      connect: "お問い合わせ先",
      connectDetails: "メール: support.samarpan@gmail.com\n電話: +91 9913679022",
      name: "お名前",
      email: "メールアドレス",
      subject: "件名",
      message: "メッセージ",
      sendMessage: "メッセージを送信"
    },
    gateway: {
      welcomeTo: "シダントへようこそ",
      heading: "アフマダーバードのプレミアデザインハウス。",
      subheading: "現代のヘリテージを再定義する。",
      retailTitle: "リテールキュレーター",
      retailDesc: "ユニークなピースを求めるブティックオーナーやプライベートクライアント向けの限定アクセス。",
      wholesaleTitle: "ビスポークホールセール",
      wholesaleDesc: "大量割り当てとグローバルディストリビューター向けの専用パートナーシップ。",
      enterPortal: "ポータルへ入る"
    }
  },
  zh: {
    about: {
      ourStory: "我们的故事",
      ourStorySubtitle: "工艺传承。我们在每一个轮廓中编织传统故事，重新定义现代民族服装。",
      artisanTitle: "工匠的触感",
      artisanDesc: "每件SIDHANT作品都是我们大师级工匠技艺的见证。通过将代代相传的技术与当代美学相结合，我们创造的服装不仅仅是穿着，更是珍藏。",
      visionTitle: "优雅的愿景",
      visionDesc: "我们的设计理念根植于真正的优雅在于细节的理念。从复杂的扎尔多兹刺绣到杜帕塔的完美垂感，我们始终专注于在奢华与优雅之间创造和谐平衡。",
      joinLegacy: "加入传承",
      joinLegacyQuote: "发现精美着装的艺术。欢迎来到SIDHANT的世界。"
    },
    contact: {
      title: "联系我们",
      subtitle: "我们在这里帮助您解答有关我们系列、定制订单或一般问题的任何询问。",
      headquarters: "总部",
      address: "C-97，4楼，苏美尔商业园-2，坎卡里亚路，瓦尼贾巴万后面，谢尔科特达，艾哈迈达巴德，古吉拉特邦，380002，印度",
      connect: "联系方式",
      connectDetails: "邮箱: support.samarpan@gmail.com\n电话: +91 9913679022",
      name: "姓名",
      email: "电子邮件",
      subject: "主题",
      message: "留言",
      sendMessage: "发送消息"
    },
    gateway: {
      welcomeTo: "欢迎来到西丹特",
      heading: "艾哈迈达巴德首屈一指的设计院。",
      subheading: "重新定义现代遗产。",
      retailTitle: "零售策展人",
      retailDesc: "为寻求独特单品的精品店主和私人客户提供独家访问权限。",
      wholesaleTitle: "定制批发",
      wholesaleDesc: "为大批量分配和全球分销商提供专属合作伙伴关系。",
      enterPortal: "进入门户"
    }
  },
  pt: {
    about: {
      ourStory: "Nossa História",
      ourStorySubtitle: "Um legado de artesanato. Tecemos histórias de tradição em cada silhueta, redefinindo a moda étnica moderna.",
      artisanTitle: "O Toque do Artesão",
      artisanDesc: "Cada peça SIDHANT é um testemunho da habilidade dos nossos mestres artesãos. Ao combinar técnicas ancestrais com estética contemporânea, criamos peças que não são apenas vestidas, mas atesoradas.",
      visionTitle: "Uma Visão de Elegância",
      visionDesc: "Nossa filosofia de design está enraizada na ideia de que a verdadeira elegância reside nos detalhes. Do intrincado bordado zardozi ao drapeado perfeito de um dupatta, nosso foco é sempre criar um equilíbrio harmonioso entre opulência e graça.",
      joinLegacy: "Junte-se ao Legado",
      joinLegacyQuote: "Descubra a arte de se vestir bem. Bem-vindo ao mundo de SIDHANT."
    },
    contact: {
      title: "Fale Conosco",
      subtitle: "Estamos aqui para ajudá-lo com quaisquer dúvidas sobre nossas coleções, pedidos personalizados ou perguntas gerais.",
      headquarters: "Sede",
      address: "C-97, 4º Andar, Sumel Business Park-2, Kankaria Road, Atrás de Vanijya Bhavan, Sherkotda, Ahmedabad, Gujarat, 380002, Índia",
      connect: "Contato",
      connectDetails: "Email: support.samarpan@gmail.com\nTelefone: +91 9913679022",
      name: "Nome",
      email: "E-mail",
      subject: "Assunto",
      message: "Mensagem",
      sendMessage: "Enviar Mensagem"
    },
    gateway: {
      welcomeTo: "Bem-vindo à Sidhant",
      heading: "A Principal Casa de Design de Ahmedabad.",
      subheading: "Redefinindo o Patrimônio Moderno.",
      retailTitle: "Curadores de Varejo",
      retailDesc: "Acesso exclusivo para proprietários de boutiques e clientes privados em busca de peças únicas.",
      wholesaleTitle: "Atacado Personalizado",
      wholesaleDesc: "Parcerias dedicadas para alocações de grande volume e distribuidores globais.",
      enterPortal: "Entrar no Portal"
    }
  }
};

const files = require('fs').readdirSync(require('path').join(__dirname, 'messages')).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const lang = file.replace('.json', '');
  const filePath = require('path').join(__dirname, 'messages', file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const langData = translations[lang] || translations.en;

  data.about = langData.about;
  data.contact = langData.contact;
  data.gateway = langData.gateway;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log('Updated', file);
});
