import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { DanhSachVe, LichChieuDto } from './dto/danh-sach-dat-ve.dto';

@Injectable()
export class QuanLyDatVeService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService
    ) { }

    prisma = new PrismaClient()

    async bookTickets(userId: number, danhSachVe: DanhSachVe) {
        try {
            let { maLichChieu, maGhe } = danhSachVe
            return await this.prisma.datVe.create(
                {
                    data: {
                        ma_lich_chieu: maLichChieu,
                        ma_nguoi_dung: userId,
                        ma_ghe: maGhe
                    }
                }
            )
        } catch (error) {
            throw error
        }
    }

    async cancelBooking(id: number, maGhe: number) {
        try {
            let ve = await this.prisma.datVe.findFirst({ where: { ma_nguoi_dung: id, ma_ghe: maGhe } })
            if (!ve || ve.huy_ve) throw new BadGatewayException('Không tìm thấy vé!')
            return await this.prisma.datVe.update({
                where: { ma_dat_ve: ve.ma_dat_ve },
                data: { ...ve, huy_ve: true }
            })
        } catch (error) {
            throw error
        }
    }

    async getListTicketRoom(maLichChieu: number) {
        try {
            let data = await this.prisma.lichChieu.findFirst({ where: { ma_lich_chieu: maLichChieu }, include: { Phim: true, RapPhim: true } })
            if (!data) throw new BadGatewayException('Không tìm thấy dữ liệu!')
            return data
        } catch (error) {
            throw error
        }
    }

    async createShowtimes(taoLichChieu: LichChieuDto, type: any) {
        try {
            if (type == 1) throw new BadGatewayException('Bạn không đủ quyền truy cập!')
            let { giaVe, maPhim, maRap, ngayGioChieu } = taoLichChieu
            let dateNgayGioChieu = new Date(ngayGioChieu)
            return await this.prisma.lichChieu.create({
                data: {
                    ma_rap: maRap,
                    ma_phim: maPhim,
                    ngay_gio_chieu: dateNgayGioChieu.toISOString(),
                    gia_ve: giaVe
                }
            })
        } catch (error) {
            throw error
        }
    }
}
