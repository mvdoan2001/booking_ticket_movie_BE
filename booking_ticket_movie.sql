/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `Banner`;
CREATE TABLE `Banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `Banner_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `CumRap`;
CREATE TABLE `CumRap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(500) DEFAULT NULL,
  `ma_he_thong_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `CumRap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap` (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DatVe`;
CREATE TABLE `DatVe` (
  `ma_dat_ve` int NOT NULL AUTO_INCREMENT,
  `ma_lich_chieu` int DEFAULT NULL,
  `ma_nguoi_dung` int DEFAULT NULL,
  `ma_ghe` int DEFAULT NULL,
  `huy_ve` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ma_dat_ve`),
  KEY `ma_nguoi_dung` (`ma_nguoi_dung`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  KEY `ma_ghe` (`ma_ghe`),
  CONSTRAINT `DatVe_ibfk_1` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `NguoiDung` (`ma_nguoi_dung`),
  CONSTRAINT `DatVe_ibfk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu` (`ma_lich_chieu`),
  CONSTRAINT `DatVe_ibfk_3` FOREIGN KEY (`ma_ghe`) REFERENCES `Ghe` (`ma_ghe`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Ghe`;
CREATE TABLE `Ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(255) DEFAULT NULL,
  `loai_ghe` varchar(255) DEFAULT NULL,
  `ma_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `HeThongRap`;
CREATE TABLE `HeThongRap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `LichChieu`;
CREATE TABLE `LichChieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  `ngay_gio_chieu` datetime DEFAULT NULL,
  `gia_ve` int DEFAULT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `ma_rap` (`ma_rap`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `LichChieu_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`),
  CONSTRAINT `LichChieu_ibfk_2` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `LoaiNguoiDung`;
CREATE TABLE `LoaiNguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_loai_nguoi_dung` varchar(50) DEFAULT 'KhachHang',
  `ten_loai` varchar(20) DEFAULT 'Khách Hàng',
  PRIMARY KEY (`id`),
  CONSTRAINT `chk_loai_nguoi_dung` CHECK ((`ten_loai` in (_utf8mb4'Khách Hàng',_utf8mb4'Quản Trị'))),
  CONSTRAINT `chk_ma_loai_nguoi_dung` CHECK ((`ma_loai_nguoi_dung` in (_utf8mb4'KhachHang',_utf8mb4'QuanTri')))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `NguoiDung`;
CREATE TABLE `NguoiDung` (
  `ma_nguoi_dung` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `so_dt` varchar(11) DEFAULT NULL,
  `tai_khoan` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `loai_nguoi_dung` int DEFAULT '1',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ma_nguoi_dung`),
  KEY `loai_nguoi_dung` (`loai_nguoi_dung`),
  CONSTRAINT `NguoiDung_ibfk_1` FOREIGN KEY (`loai_nguoi_dung`) REFERENCES `LoaiNguoiDung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Phim`;
CREATE TABLE `Phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(50) DEFAULT NULL,
  `trailer` varchar(255) NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `sap_chieu` tinyint(1) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `RapPhim`;
CREATE TABLE `RapPhim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) DEFAULT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  CONSTRAINT `RapPhim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap` (`ma_cum_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(1, 1, 'avengers_banner.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(2, 2, 'spiderman_banner.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(3, 3, 'darkknight_banner.jpg');

INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'CGV Ho Chi Minh', '123 ABC Street, Ho Chi Minh City', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(2, 'Lotte Ha Noi', '456 XYZ Street, Ha Noi', 2);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(3, 'BHD Star Da Nang', '789 DEF Street, Da Nang', 3);

INSERT INTO `DatVe` (`ma_dat_ve`, `ma_lich_chieu`, `ma_nguoi_dung`, `ma_ghe`, `huy_ve`) VALUES
(1, 1, 4, 2, 1);


INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(1, 'A1', 'VIP', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(2, 'B5', 'Thường', 2);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(3, 'C3', 'VIP', 3);

INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'CGV Cinemas', 'cgv_logo.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(2, 'Lotte Cinema', 'lotte_logo.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(3, 'BHD Star Cineplex', 'bhd_logo.jpg');

INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(1, 1, 1, '2024-04-01 14:00:00', 120000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(2, 2, 2, '2024-04-02 15:30:00', 150000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(3, 3, 3, '2024-04-03 17:00:00', 100000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(4, 2, 2, '2024-05-02 08:30:00', 200000),
(5, 2, 3, '2024-05-01 00:00:00', 190000);

INSERT INTO `LoaiNguoiDung` (`id`, `ma_loai_nguoi_dung`, `ten_loai`) VALUES
(1, 'KhachHang', 'Khách Hàng');
INSERT INTO `LoaiNguoiDung` (`id`, `ma_loai_nguoi_dung`, `ten_loai`) VALUES
(2, 'QuanTri', 'Quản Trị');


INSERT INTO `NguoiDung` (`ma_nguoi_dung`, `ho_ten`, `email`, `so_dt`, `tai_khoan`, `mat_khau`, `loai_nguoi_dung`, `isDelete`) VALUES
(1, 'Giàng A Phò', 'gap@gmail.com', '0969273267', 'gap113', '$2b$10$.msWZnO5gmFeylRZNNxGs.XDzwTx8yI6HOX5LMvQdOdeBcDl356bq', 1, 0);
INSERT INTO `NguoiDung` (`ma_nguoi_dung`, `ho_ten`, `email`, `so_dt`, `tai_khoan`, `mat_khau`, `loai_nguoi_dung`, `isDelete`) VALUES
(2, 'Mai Văn Đoàn', 'string', 'string', 'string', '$2b$10$Z4sfV9A8ZqW4nF6EctSS0.zoCYYRD/Ji.YlGITYcw1IfOvsGS0WTG', 1, 0);
INSERT INTO `NguoiDung` (`ma_nguoi_dung`, `ho_ten`, `email`, `so_dt`, `tai_khoan`, `mat_khau`, `loai_nguoi_dung`, `isDelete`) VALUES
(3, 'Giàng A Vui', 'gav@gmail.com', '0969555555', 'gav', '$2b$10$U5Y6ZjO5aImRUCynu1PNc.9BmN1qEoE2VIcQdiKRMqX6HDT3.UE0q', 1, 0);
INSERT INTO `NguoiDung` (`ma_nguoi_dung`, `ho_ten`, `email`, `so_dt`, `tai_khoan`, `mat_khau`, `loai_nguoi_dung`, `isDelete`) VALUES
(4, 'Mai Văn Đoàn', 'mvdoan.be@gmail.com', '0969286240', 'mvdoan', '$2a$10$vPyCNRz92xr4CoWIqX1GCeVOFhIFbPWb0WZmhjXkgF9LlajpUuzlS', 2, 0),
(5, 'killerqueen', 'kill', '0123456789', 'kill', '$2b$10$lB1qiNgBTvKvnvoMLns2vu1OhrBoyrQjAvE0jz8VLcDuL6.Yb845C', 2, 0),
(6, 'Mai Văn Đoàn', 'mvdoan2001@gmail.com', '0969286240', 'mvdoan21', '$2b$10$Rqy15981u3Wy/0bHEHHcF.6OwtFyQmXw/KxIANfdPA.Ap01g.KbE.', 1, 0);

INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`, `isDelete`) VALUES
(1, 'Avengers: Endgame', 'https://www.youtube.com/watch?app=desktop&v=ykBfss-8H4Y', 'avengers.jpg', 'Cuộc chiến cuối cùng của các siêu anh hùng', '2019-04-26', 10, 1, 1, 0, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`, `isDelete`) VALUES
(2, 'Spider-Man: No Way Home', 'https://www.youtube.com/watch?v=rZYVIK0R6sg', 'spiderman.jpg', 'Cuộc phiêu lưu mới của Spider-Man', '2021-12-17', 9, 1, 1, 0, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`, `isDelete`) VALUES
(3, 'The Dark Knight', 'https://youtu.be/THXPCF6UHh8?si=jR6LlMjZL-d0oISx', 'darkknight.jpg', 'Cuộc chiến giữa Batman và Joker', '2008-07-18', 9, 0, 1, 0, 0);

INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'CGV District 1', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(2, 'Lotte Center', 2);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(3, 'BHD Star Cinema', 3);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(4, 'rap 1', 1),
(5, 'rap 2', 1),
(6, 'rap 3', 1);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;