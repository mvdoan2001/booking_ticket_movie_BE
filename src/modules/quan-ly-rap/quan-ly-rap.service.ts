import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuanLyRapService {

    prisma = new PrismaClient()

    async getInfoRap(maHeThongRap: number) {
        try {
            let data = await this.prisma.heThongRap.findFirst({ where: { ma_he_thong_rap: maHeThongRap } })
            if (!data) throw new BadGatewayException('Không tìm thấy dữ liệu!')
            return data
        } catch (error) {
            throw error
        }
    }

    async getInfoCumRap(maHeThongRap: number) {
        try {
            let data = await this.prisma.heThongRap.findFirst({ where: { ma_he_thong_rap: maHeThongRap } })
            if (!data) throw new BadGatewayException('Không tìm thấy dữ liệu!')
            return await this.prisma.cumRap.findMany({ where: { ma_he_thong_rap: data.ma_he_thong_rap }, include: { RapPhim: true } })
        } catch (error) {
            throw error
        }
    }

    async getInfoShowtimesTheaters(maHeThongRap: number) {
        try {
            let data = await this.prisma.heThongRap.findFirst({ where: { ma_he_thong_rap: maHeThongRap } })
            if (!data) throw new NotFoundException('Không tìm thấy dữ liệu!')
            return await this.prisma.heThongRap.findMany({
                where: { ma_he_thong_rap: data.ma_he_thong_rap },
                include: {
                    CumRap: {
                        include: {
                            RapPhim: {
                                include: {
                                    LichChieu: {
                                        include: { Phim: true }
                                    }
                                }
                            }
                        }
                    }
                }
            })

        } catch (error) {
            throw error
        }
    }

    async getInfoShowtimesMovie(maPhim: number) {
        try {
            let data = await this.prisma.phim.findFirst({
                where: { ma_phim: maPhim },
                include: { LichChieu: {
                    include: { RapPhim: {
                        include: { CumRap: {
                            include: { HeThongRap: true }
                        } }
                    } }
                } }
            })
            if(!data || data.isDelete) throw new NotFoundException('Không tìm thấy tài nguyên!') 
            return data
        } catch (error) {
            throw error
        }
    }
}
