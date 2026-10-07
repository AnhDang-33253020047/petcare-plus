export interface ArticleDetail {
  id: number
  title: string
  category: string
  image: string
  readTime: string
  author: string
  date: string
  excerpt: string
  content: {
    intro: string
    sections: {
      heading: string
      body: string
      points?: string[]
    }[]
    vetTip: string
  }
}

export const ARTICLES_DATA: ArticleDetail[] = [
  {
    id: 1,
    title: "Kết hợp thịt sấy khô (freeze-dried) và thức ăn ướt cho mèo kén ăn",
    category: "Dinh dưỡng",
    image: "https://kingspet.vn/wp-content/uploads/2023/03/Product-Listing-Hero-Cat-Food.webp?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 phút đọc",
    author: "BSTY. Nguyễn Minh Tuấn",
    date: "24/09/2026",
    excerpt: "Bí quyết mix các loại thịt sấy khô cùng pate dạng gói giúp kích thích vị giác, đảm bảo boss nạp đủ nước và protein mỗi ngày.",
    content: {
      intro: "Nhiều người nuôi mèo đối mặt với tình trạng 'boss' bỏ ăn, kén chọn hạt hoặc chỉ ăn một lượng rất nhỏ. Phương pháp kết hợp thịt sấy thăng hoa (freeze-dried raw) và thức ăn ướt (wet food) là giải pháp tối ưu giúp phục hồi vị giác tự nhiên.",
      sections: [
        {
          heading: "1. Tại sao thịt sấy thăng hoa lại kích thích vị giác mạnh mẽ?",
          body: "Công nghệ sấy thăng hoa giữ lại đến 98% hàm lượng dinh dưỡng và hương vị tự nhiên của thịt sống mà không dùng chất bảo quản. Mùi thơm tự nhiên của thịt bò, gan gà hay ức gà sấy đánh thức bản năng săn mồi của loài mèo.",
          points: [
            "Bảo toàn enzyme tiêu hóa có lợi trong thịt tươi sống.",
            "Không chứa tinh bột độn gây gánh nặng cho hệ tiêu hóa.",
            "Dễ dàng nghiền vụn để rắc làm 'topping' lên trên bữa ăn chính."
          ]
        },
        {
          heading: "2. Công thức phối trộn chuẩn y khoa",
          body: "Nghiền nhỏ 1-2 viên thịt sấy, trộn đều cùng 1/2 gói pate và thêm 15-20ml nước ấm. Nước ấm giúp giải phóng mùi thơm của mỡ động vật gấp 2 lần bình thường, đồng thời bù đắp lượng nước thiếu hụt cho mèo lười uống nước."
        }
      ],
      vetTip: "Không ngâm thịt sấy khô với nước nóng trên 60°C vì nhiệt độ cao sẽ làm biến tính enzyme tự nhiên và giảm giá trị vitamin nhóm B."
    }
  },
  {
    id: 2,
    title: "Phòng ngừa và hỗ trợ điều trị bệnh tiết niệu ở mèo",
    category: "Bệnh lý",
    image: "https://happypaws.vn/wp-content/uploads/benh-viem-phe-quan-o-meo3-1.jpg?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 phút đọc",
    author: "BSTY. Lê Hoàng Long",
    date: "22/09/2026",
    excerpt: "Tìm hiểu nguyên nhân gây sỏi thận, bí tiểu và cách bổ sung các loại gel dinh dưỡng hỗ trợ tiết niệu (urinary) vào chế độ ăn hàng ngày.",
    content: {
      intro: "Hội chứng đường tiết niệu dưới ở mèo (FLUTD) là bệnh lý phổ biến hàng đầu tại các phòng khám thú y, đặc biệt nguy hiểm với mèo đực do niệu đạo hẹp.",
      sections: [
        {
          heading: "1. Các dấu hiệu cảnh báo sớm",
          body: "Mèo bị viêm hoặc sỏi bàng quang thường biểu hiện các hành vi bất thường mà chủ nuôi dễ nhầm lẫn với việc 'khó tính':",
          points: [
            "Đi vệ sinh nhiều lần trong ngày nhưng chỉ ra vài giọt.",
            "Kêu gào, bồn chồn hoặc rặn đau khi ngồi trong chậu cát.",
            "Đi tiểu ra ngoài khay vệ sinh, trên thảm hoặc giường nệm.",
            "Nước tiểu có màu hồng nhạt hoặc lẫn tia máu."
          ]
        },
        {
          heading: "2. Phác đồ điều chỉnh khẩu phần ăn",
          body: "Chuyển hẳn sang thức ăn ướt có độ ẩm trên 78%, kết hợp gel hỗ trợ đường tiết niệu có chứa DL-Methionine để duy trì độ pH nước tiểu ở mức lý tưởng (6.2 - 6.5), giúp hòa tan tinh thể struvite tự nhiên."
        }
      ],
      vetTip: "Nếu mèo đực rặn tiểu liên tục nhưng hoàn toàn không ra nước trong vòng 12-24 giờ, đây là tình trạng cấp cứu tắc niệu đạo đe dọa tính mạng, cần đưa đến trạm thú y ngay lập tức."
    }
  },
  {
    id: 3,
    title: "Hiểu đúng về bảo hiểm thú y và hạn mức chi trả",
    category: "Kiến thức",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 phút đọc",
    author: "Ban Cố Vấn PetCare+",
    date: "20/09/2026",
    excerpt: "Làm sao để tận dụng tối đa quyền lợi bảo lãnh viện phí cashless khi đưa boss đi khám? Những điểm loại trừ nào cần lưu ý?",
    content: {
      intro: "Bảo hiểm sức khỏe thú cưng không chỉ là giải pháp tài chính dự phòng mà còn là tấm lưới an sinh giúp chủ nuôi không phải do dự đưa ra quyết định điều trị khi chi phí phẫu thuật vượt quá ngân sách.",
      sections: [
        {
          heading: "1. Cơ chế bảo lãnh viện phí trực tiếp (Cashless)",
          body: "Với các phòng khám đối tác của PetCare+, bạn chỉ cần xuất trình mã PetID định danh trên ứng dụng. Phòng khám sẽ đối soát viện phí trực tiếp với hệ thống bảo hiểm, bạn chỉ cần thanh toán phần đồng chi trả (nếu có).",
          points: [
            "Không cần tự ứng tiền túi trước hàng chục triệu đồng.",
            "Quy trình duyệt hồ sơ bảo lãnh tức thì trong vòng 15 phút tại quầy lễ tân.",
            "Áp dụng cho cả nội trú, phẫu thuật cấp cứu và xét nghiệm chuyên sâu."
          ]
        },
        {
          heading: "2. Các trường hợp loại trừ cần biết",
          body: "Hầu hết các gói bảo hiểm không chi trả cho các bệnh bẩm sinh đã phát hiện trước thời gian chờ, chi phí phối giống, hoặc các thủ thuật thẩm mỹ không phục vụ mục đích cứu chữa y khoa."
        }
      ],
      vetTip: "Nên tham gia bảo hiểm cho thú cưng từ khi còn nhỏ (từ 2 tháng tuổi) để tránh phát sinh bệnh lý có sẵn trước khi hợp đồng có hiệu lực."
    }
  },
  {
    id: 4,
    title: "Bao lâu thì nên chải răng cho thú cưng một lần?",
    category: "Chăm sóc",
    image: "https://www.carecredit.com/sites/cc/image/cat_teeth_cleaning.jpg?q=80&w=1000&auto=format&fit=crop",
    readTime: "3 phút đọc",
    author: "Chuyên viên Grooming Thu Thảo",
    date: "18/09/2026",
    excerpt: "Chăm sóc răng miệng không chỉ giúp giảm mùi hôi mà còn ngăn ngừa các bệnh lý về nướu. Hướng dẫn các bước chải răng cơ bản tại nhà.",
    content: {
      intro: "Hơn 80% chó mèo trên 3 tuổi mắc các vấn đề về nha chu. Vi khuẩn từ mảng bám chân răng có thể xâm nhập vào máu, gây suy giảm chức năng tim và thận.",
      sections: [
        {
          heading: "1. Tần suất chải răng tiêu chuẩn",
          body: "Lý tưởng nhất là chải răng hàng ngày. Nếu quỹ thời gian hạn hẹp, bạn cần duy trì tối thiểu 3 lần/tuần kết hợp cùng que gặm sạch răng chuyên dụng và nước xịt khử khuẩn men răng.",
          points: [
            "Tập làm quen với bàn chải xỏ ngón mềm từ nhỏ.",
            "Tuyệt đối dùng kem đánh răng chuyên dụng dành riêng cho thú cưng nuốt được.",
            "Không bao giờ dùng kem đánh răng của người vì chứa Fluoride và Xylitol gây ngộ độc gan cấp tính."
          ]
        },
        {
          heading: "2. Kỹ thuật chải răng không gây hoảng loạn",
          body: "Thoa một chút kem đánh răng có vị thịt gà hoặc cá hồi lên ngón tay cho thú cưng liếm thử. Khi chúng quen với mùi vị, nhẹ nhàng kéo môi lên và chải theo chuyển động tròn ở mặt ngoài của răng hàm trên."
        }
      ],
      vetTip: "Vôi răng bám dày màu nâu vàng kèm nướu sưng đỏ không thể làm sạch bằng bàn chải thông thường, cần đưa đến phòng khám để lấy cao răng bằng sóng siêu âm có gây mê an toàn."
    }
  },
  {
    id: 5,
    title: "Lịch tiêm phòng vaccine cơ bản cho cún con mới đón về",
    category: "Y tế cơ bản",
    image: "https://bramaleaanimalhospital.ca/wp-content/uploads/2025/02/puppy-vaccine-veterinarian-labrador.webp?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 phút đọc",
    author: "BSTY. Phạm Trần Đăng",
    date: "15/09/2026",
    excerpt: "Tổng hợp các mũi tiêm bắt buộc (5 bệnh, 7 bệnh, dại) và các mốc thời gian quan trọng sen cần ghi nhớ để bảo vệ cún cưng khỏi bệnh truyền nhiễm.",
    content: {
      intro: "Kháng thể mẹ truyền cho cún con sẽ suy giảm dần sau 6 tuần tuổi. Tiêm vaccine đúng lịch là lá chắn duy nhất chống lại hai sát thủ nguy hiểm nhất: Parvovirus và Care (Distemper).",
      sections: [
        {
          heading: "1. Lịch tiêm phòng 3 mũi tiêu chuẩn",
          body: "Phác đồ tiêm cơ bản áp dụng cho toàn bộ các giống chó cảnh:",
          points: [
            "Mũi 1 (6 - 8 tuần tuổi): Vaccine đa giá ngừa 5 bệnh cốt lõi.",
            "Mũi 2 (10 - 12 tuần tuổi): Vaccine 7 bệnh (nhắc lại và bổ sung bệnh Lepto).",
            "Mũi 3 (14 - 16 tuần tuổi): Mũi 7 bệnh nhắc lại lần cuối hoàn tất miễn dịch cơ sở.",
            "Từ 3 tháng tuổi trở lên: Tiêm phòng bắt buộc bệnh Dại (Rabies) và nhắc lại hàng năm."
          ]
        },
        {
          heading: "2. Chăm sóc trước và sau tiêm",
          body: "Chỉ tiêm khi cún con hoàn toàn khỏe mạnh, không sốt, không tiêu chảy. Tẩy giun trước khi tiêm 1 tuần để vaccine đạt hiệu quả sinh kháng thể tối đa. Không tắm cho cún trong 7 ngày sau tiêm."
        }
      ],
      vetTip: "Sau mũi tiêm thứ 3 tối thiểu 14 ngày, hệ miễn dịch của cún mới hoàn thiện. Tránh dắt cún ra công viên hoặc tiếp xúc với chó lạ trước thời điểm này."
    }
  },
  {
    id: 6,
    title: "Mẹo giữ vệ sinh nhà cửa khi nuôi thú cưng trong căn hộ",
    category: "Đời sống",
    image: "https://housevnstorage.blob.core.windows.net/media/nuoi-thu-cung-trong-can-ho-0009.png?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 phút đọc",
    author: "Ban Biên Tập PetCare+",
    date: "12/09/2026",
    excerpt: "Từ việc chọn loại cát vệ sinh ít bụi đến cách xử lý lông rụng trên sofa, giúp không gian sống luôn sạch sẽ thơm tho.",
    content: {
      intro: "Không gian khép kín của căn hộ chung cư đòi hỏi quy trình kiểm soát mùi hôi và bụi lông nghiêm ngặt hơn để bảo vệ đường hô hấp của cả gia đình.",
      sections: [
        {
          heading: "1. Giải pháp kiểm soát mùi khay vệ sinh",
          body: "Khay vệ sinh cần đặt ở khu vực thoáng khí như ban công có mái che hoặc gần quạt thông gió nhà tắm. Sử dụng cát đậu nành tự nhiên hoặc cát đất sét than hoạt tính có khả năng vón nhanh và khử mùi amoniac vượt trội.",
          points: [
            "Dọn dẹp khay vệ sinh tối thiểu 2 lần mỗi ngày.",
            "Thay toàn bộ cát và rửa sạch khay bằng nước ấm mỗi tuần.",
            "Sử dụng xịt enzyme sinh học khử mùi thay vì nước hoa xịt phòng thông thường."
          ]
        },
        {
          heading: "2. Xử lý triệt để lông rụng trong không khí",
          body: "Trang bị máy lọc không khí có màng lọc HEPA để giữ lại bụi mịn và phấn lông thú cưng. Chải lông cho chó mèo mỗi ngày bằng lược chải rụng chuyên dụng để gom lông chết trước khi chúng rơi xuống sofa."
        }
      ],
      vetTip: "Chó mèo rụng lông từng mảng kèm gãi ngứa liên tục là dấu hiệu nấm da hoặc ve rận, không phải rụng lông sinh lý bình thường."
    }
  },
  {
    id: 7,
    title: "Cách huấn luyện chó con đi vệ sinh đúng chỗ",
    category: "Huấn luyện",
    image: "https://happypaws.vn/wp-content/uploads/Day-cho-di-ve-sinh-dung-cho.png?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 phút đọc",
    author: "Huấn Luyện Viên Đỗ Tuấn",
    date: "10/09/2026",
    excerpt: "Hướng dẫn các bước thiết lập thói quen và sử dụng khay vệ sinh hoặc tã lót hiệu quả cho cún cưng trong những tháng đầu tiên.",
    content: {
      intro: "Chó con có bàng quang nhỏ và chưa kiểm soát được cơ vòng. Chìa khóa thành công trong việc dạy đi vệ sinh là tính kiên nhẫn, thiết lập giờ giấc cố định và nguyên tắc khen thưởng tích cực.",
      sections: [
        {
          heading: "1. Bắt trọn các khung giờ 'vàng'",
          body: "Chó con luôn có nhu cầu bài tiết vào các thời điểm cố định trong ngày:",
          points: [
            "Ngay sau khi thức dậy vào buổi sáng.",
            "Sau mỗi bữa ăn khoảng 15 - 30 phút.",
            "Sau khi chạy nhảy đùa giỡn mệt mỏi.",
            "Khi cún bắt đầu đi vòng quanh, đánh hơi sát mặt sàn và rên nhẹ."
          ]
        },
        {
          heading: "2. Nguyên tắc khen thưởng, tuyệt đối không trừng phạt",
          body: "Ngay khi cún đi đúng vào khay hoặc tấm lót, hãy khen ngợi bằng giọng vui tươi và thưởng ngay một mẩu bánh thưởng trong vòng 3 giây. Nếu cún đi sai chỗ, nhẹ nhàng dọn sạch và dùng cồn khử mùi để cún không quay lại vị trí đó."
        }
      ],
      vetTip: "Dí mũi cún vào bãi nước tiểu hoặc đánh phạt khi chúng đi sai chỗ sẽ khiến cún hoảng sợ, dẫn đến thói quen trốn vào góc khuất hoặc ăn phân để phi tang."
    }
  },
  {
    id: 8,
    title: "Tại sao mèo thích cắn tay chủ và cách xử lý an toàn",
    category: "Tâm lý học",
    image: "https://articles.hepper.com/wp-content/uploads/2022/12/cat-bites-the-womans-hand_Luis-Echeverri-Urrea_Shutterstock.jpg?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 phút đọc",
    author: "Chuyên gia Hành vi Động vật Minh Thảo",
    date: "08/09/2026",
    excerpt: "Hội chứng cắn yêu (love bites) hay hành vi hung hăng do stress? Giải mã tâm lý loài mèo và cách dạy boss chơi đùa không dùng móng vuốt.",
    content: {
      intro: "Đang vuốt ve âu yếm thì bỗng nhiên bị mèo quay sang cắn phập vào tay là trải nghiệm mà hầu như người nuôi mèo nào cũng từng trải qua.",
      sections: [
        {
          heading: "1. Nguyên nhân kích hoạt phản xạ cắn",
          body: "Cắn không phải lúc nào cũng là ghét bỏ. Có 3 nguyên nhân tâm lý cốt lõi:",
          points: [
            "Quá tải kích thích xúc giác (Petting-induced aggression): Vuốt ve quá lâu khiến hệ thần kinh của mèo bị nhạy cảm quá mức.",
            "Thói quen chơi đùa từ nhỏ: Khi còn bé, chủ nuôi dùng bàn tay làm đồ chơi cho mèo vồ, khiến mèo mặc định tay người là con mồi.",
            "Cắn yêu (Love bite): Hành động bắt chước tập tính gặm cổ âu yếm của mèo mẹ."
          ]
        },
        {
          heading: "2. Cách chuyển hướng phản xạ",
          body: "Khi mèo bắt đầu quẫy mạnh đuôi, tai hơi cụp về sau, hãy dừng vuốt ve ngay lập tức. Thay thế bàn tay bằng cần câu mèo hoặc gối ôm dạng cá nhồi catnip để mèo xả năng lượng cào cắn."
        }
      ],
      vetTip: "Vết mèo cắn sâu chảy máu có nguy cơ nhiễm trùng vi khuẩn Pasteurella multocida rất cao, cần rửa sạch bằng xà phòng dưới vòi nước chảy và sát khuẩn cồn y tế ngay."
    }
  },
  {
    id: 9,
    title: "10 loại thực phẩm tuyệt đối không cho chó ăn",
    category: "Dinh dưỡng",
    image: "https://thebreedexpert.com/wp-content/uploads/2026/06/safer-treat-alternatives-for-frenchies-1024x576.webp?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 phút đọc",
    author: "BSTY. Nguyễn Minh Tuấn",
    date: "05/09/2026",
    excerpt: "Nho khô, chocolate, hành tỏi... là những thực phẩm quen thuộc trong bếp nhưng lại có thể gây ngộ độc cấp tính cho chó nhà bạn.",
    content: {
      intro: "Hệ tiêu hóa và trao đổi chất của loài chó rất khác con người. Nhiều món ăn bổ dưỡng với chúng ta lại là chất kịch độc đối với loài chó.",
      sections: [
        {
          heading: "1. Nhóm thực phẩm gây suy tạng cấp tính",
          body: "Đây là những thứ tuyệt đối không được để rơi vãi trong tầm với của cún:",
          points: [
            "Chocolate & Cacao: Chứa Theobromine gây loạn nhịp tim, co giật và tử vong.",
            "Nho tươi & Nho khô: Gây suy thận cấp tính chỉ với một lượng rất nhỏ.",
            "Hành, hẹ, tỏi: Chứa Thiosulfate phá hủy hồng cầu, dẫn đến thiếu máu tán huyết trầm trọng.",
            "Chất tạo ngọt Xylitol (kẹo cao su, bơ đậu phộng ăn kiêng): Khiến tụy giải phóng lượng lớn insulin gây hạ đường huyết và suy gan cấp tính."
          ]
        },
        {
          heading: "2. Xương nấu chín và các nguy cơ tiềm ẩn",
          body: "Xương gà, xương sườn heo đã nấu chín trở nên giòn và dễ gãy vụn thành các mảnh sắc nhọn, có thể đâm thủng thực quản, dạ dày hoặc gây tắc ruột cần phải mổ khẩn cấp."
        }
      ],
      vetTip: "Nếu nghi ngờ cún ăn phải chocolate hoặc nho khô, hãy gọi điện ngay cho bác sĩ thú y để được hướng dẫn gây nôn an toàn trong vòng 2 giờ đầu tiên."
    }
  },
  {
    id: 10,
    title: "Bệnh búi lông ở mèo: Dấu hiệu và cách phòng ngừa",
    category: "Bệnh lý",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HlCOeNfmH2RR75g5IdEo3_OHofIvYWun-ZdblF-HjO7P0n3C_77ot_g&s=10?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 phút đọc",
    author: "BSTY. Lê Hoàng Long",
    date: "02/09/2026",
    excerpt: "Mèo nôn ra những cục lông dài là hiện tượng sinh lý hay bệnh lý? Cách bổ sung cỏ mèo và gel tiêu búi lông đúng chuẩn.",
    content: {
      intro: "Lưỡi của mèo có hàng ngàn gai nhú hình móc câu hướng về phía sau, đóng vai trò như chiếc lược tự nhiên. Lông rụng nuốt vào dạ dày nếu không được đào thải sẽ tích tụ thành búi lông lớn.",
      sections: [
        {
          heading: "1. Dấu hiệu búi lông bị tắc nghẽn nguy hiểm",
          body: "Khác với việc thỉnh thoảng khạc ra búi lông nhỏ, nếu búi lông quá lớn gây tắc ruột, mèo sẽ có các triệu chứng sau:",
          points: [
            "Ho khan, ọc khan liên tục nhưng không nôn ra được gì.",
            "Bỏ ăn, lừ đừ, bụng chướng to và đau khi chạm vào.",
            "Táo bón nhiều ngày hoặc phân khô cứng lẫn sợi lông dày đặc."
          ]
        },
        {
          heading: "2. Các biện pháp tiêu lông chủ động",
          body: "Chải lông hàng ngày để loại bỏ lông chết. Cho mèo ăn cỏ mèo tươi (lúa mạch) định kỳ để bổ sung chất xơ kích thích tống khứ lông, và dùng gel tiêu búi lông (malt paste) 2-3 lần mỗi tuần."
        }
      ],
      vetTip: "Vào mùa thay lông xuân - hè, nên tăng cường khẩu phần thức ăn hạt có bổ sung chất xơ không hòa tan (Hairball Control) để hỗ trợ đào thải lông qua đường phân an toàn."
    }
  },
  {
    id: 11,
    title: "Thời gian vận động lý tưởng mỗi ngày cho từng giống chó",
    category: "Chăm sóc",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 phút đọc",
    author: "Huấn Luyện Viên Đỗ Tuấn",
    date: "30/08/2026",
    excerpt: "Chó Corgi cần vận động bao lâu? Poodle có cần chạy bộ không? Khám phá lịch trình tập thể dục phù hợp để cún luôn khỏe mạnh.",
    content: {
      intro: "Thiếu vận động là nguyên nhân số một dẫn đến tình trạng cắn phá đồ đạc, sủa bậy và béo phì ở chó. Tuy nhiên, vận động quá sức cũng có thể hủy hoại khớp xương của các giống chó chân ngắn.",
      sections: [
        {
          heading: "1. Phân loại theo nhu cầu năng lượng của từng giống",
          body: "Mỗi nhóm giống chó đòi hỏi mức độ giải phóng năng lượng rất khác nhau:",
          points: [
            "Giống chó nhỏ (Poodle, Phốc sóc, Chihuahua): 30 phút đi dạo nhẹ nhàng kết hợp chơi đồ chơi trong nhà mỗi ngày.",
            "Giống chân ngắn, lưng dài (Corgi, Dachshund): 45 phút đi bộ trên mặt phẳng, tuyệt đối hạn chế nhảy bậc thang cao để tránh thoát vị đĩa đệm.",
            "Giống năng lượng cao (Golden Retriever, Husky, Border Collie): 60 - 90 phút chạy bộ, ném bóng hoặc bơi lội."
          ]
        },
        {
          heading: "2. Quy tắc vận động theo thời tiết",
          body: "Vào những ngày hè oi bức, chỉ dắt cún đi dạo vào sáng sớm hoặc sau 7 giờ tối. Mặt đường nhựa nóng bỏng có thể làm bỏng rát đệm chân và khiến các giống mõm ngắn (Bulldog, Pug) bị sốc nhiệt nguy kịch."
        }
      ],
      vetTip: "Chó con dưới 1 năm tuổi đang trong giai đoạn phát triển sụn khớp, chỉ nên áp dụng quy tắc 5 phút đi dạo cho mỗi tháng tuổi mỗi ngày."
    }
  },
  {
    id: 12,
    title: "Mẹo kích thích mèo uống nhiều nước phòng bệnh suy thận",
    category: "Chăm sóc",
    image: "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt36e4c847afa89ebf/64023a8b27ccd11087ac69df/article-how-get-cat-drink-more-water-open-graph@1x.jpg?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 phút đọc",
    author: "BSTY. Phạm Trần Đăng",
    date: "27/08/2026",
    excerpt: "Mèo vốn lười uống nước. Đặt đài phun nước, thêm đá viên hay sử dụng súp thưởng là những cách hiệu quả giúp boss cấp ẩm đầy đủ.",
    content: {
      intro: "Tổ tiên loài mèo vốn sống ở sa mạc nên cơ chế cảm nhận cơn khát của chúng rất kém. Thói quen lười uống nước kinh niên là thủ phạm dẫn đến suy thận mãn tính khi mèo bước qua tuổi thứ 7.",
      sections: [
        {
          heading: "1. Thấu hiểu sở thích uống nước kỳ lạ của mèo",
          body: "Mèo rất cảnh giác với nguồn nước tù đọng vì trong tự nhiên đó là nguồn nước dễ nhiễm khuẩn:",
          points: [
            "Mèo thích nước chảy: Đầu tư một chiếc đài phun nước tự động có màng lọc than hoạt tính sẽ tăng lượng nước uống lên gấp đôi.",
            "Vị trí đặt bát nước: Không đặt bát nước cạnh khay vệ sinh hoặc sát cạnh đĩa thức ăn.",
            "Chất liệu bát: Chọn bát gốm sứ hoặc inox lòng rộng để râu mèo không bị chạm vào thành bát khi uống."
          ]
        },
        {
          heading: "2. 'Bơm' nước khéo léo qua đường dinh dưỡng",
          body: "Pha loãng súp thưởng dinh dưỡng hoặc hầm nước cốt ức gà (không nêm gia vị) rồi trữ đông thành các viên đá nhỏ. Mỗi ngày thả một viên đá nước dùng gà vào bát nước để kích thích tính tò mò của mèo."
        }
      ],
      vetTip: "Mèo cần trung bình 50-60ml nước trên mỗi kg trọng lượng cơ thể mỗi ngày. Mèo nặng 4kg cần nạp khoảng 200-240ml nước từ cả thức ăn và nước uống."
    }
  }
]
