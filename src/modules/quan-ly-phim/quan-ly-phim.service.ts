import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuanLyPhimService {

    prisma = new PrismaClient()

    async getListBanner() {
        try {
            return await this.prisma.banner.findMany({ include: { Phim: true } });
        } catch (error) {
            throw error
        }
    }

    async getListMovie() {
        try {
            return await this.prisma.phim.findMany();
        } catch (error) {
            throw error
        }
    }

    async getPaginationMovieList(tenPhim: string, soTrang: number, soPhanTuTrenTrang: number) {
        try {
            let movie = await this.prisma.phim.findMany({
                take: soPhanTuTrenTrang,
                skip: (soTrang - 1) * soPhanTuTrenTrang,
                where: { ten_phim: { contains: `${tenPhim}` } }
            })
            let totalCount = await this.prisma.phim.count()
            let totalPages = Math.ceil(totalCount / soPhanTuTrenTrang)
            return {
                currentPage: soTrang,
                count: soPhanTuTrenTrang,
                totalPages: totalPages,
                totalCount: totalCount,
                items: movie
            }
        } catch (error) {
            throw error
        }
    }

    async getListMovieByDay(tenPhim: string, soTrang: number, soPhanTuTrenTrang: number, tuNgay: string, denNgay: string) {
        try {
            let dateTuNgay = new Date(tuNgay)
            let dateDenNgay = new Date(denNgay)

            let movie = await this.prisma.phim.findMany({
                take: soPhanTuTrenTrang,
                skip: (soTrang - 1) * soPhanTuTrenTrang,
                where: {
                    ten_phim: { contains: `${tenPhim}` },
                    ngay_khoi_chieu: {
                        gte: dateTuNgay.toISOString(),
                        lt: dateDenNgay.toISOString()
                    }
                }
            })
            let totalCount = await this.prisma.phim.count({
                where: {
                    ten_phim: { contains: `${tenPhim}` },
                    ngay_khoi_chieu: {
                        gte: dateTuNgay.toISOString(),
                        lt: dateDenNgay.toISOString()
                    }
                }
            })
            let totalPages = Math.ceil(totalCount / soPhanTuTrenTrang)
            return {
                currentPage: soTrang,
                count: soPhanTuTrenTrang,
                totalPages: totalPages,
                totalCount: totalCount,
                items: movie
            }
        } catch (error) {
            throw error
        }
    }

    async addMovie(file: any, type: any, phim: any) {
        try {
            if (type == 1) throw new BadRequestException('Bạn không đủ quyền truy cập!')
            let { tenPhim, trailer, moTa, ngayKhoiChieu, danhGia, hot, dangChieu, sapChieu } = phim
            let dateNgayKhoiChieu = new Date(ngayKhoiChieu)
            let newMovie = {
                ten_phim: String(tenPhim),
                trailer: String(trailer),
                hinh_anh: String(file.originalname),
                mo_ta: String(moTa),
                ngay_khoi_chieu: dateNgayKhoiChieu.toISOString(),
                danh_gia: Number(danhGia),
                hot: Boolean(hot),
                dang_chieu: Boolean(dangChieu),
                sap_chieu: Boolean(sapChieu),
            }
            return await this.prisma.phim.create({ data: newMovie })
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateMovie() { }

    async delMovie(maPhim: number, type: any) {
        try {
            if (type == 1) throw new BadRequestException('Bạn không đủ quyền truy cập!')
            let movie = await this.prisma.phim.findFirst({ where: { ma_phim: maPhim } })
            if (!movie) throw new BadRequestException('Không tìm thấy phim!')
            return await this.prisma.phim.update(
                {
                    where: { ma_phim: movie.ma_phim },
                    data: { ...movie, isDelete: true }
                }
            )
        } catch (error) {
            throw error
        }
    }

    async getInfoMovie(maPhim: number, type: any) {
        try {
            if (type == 1) throw new BadRequestException('Bạn không đủ quyền truy cập!')
            let movie = await this.prisma.phim.findFirst({ where: { ma_phim: maPhim } })
            if (!movie) throw new BadRequestException('Không tìm thấy phim!')
            return movie
        } catch (error) {
            throw error
        }
    }
}
