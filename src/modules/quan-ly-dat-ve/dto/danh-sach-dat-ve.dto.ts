import { ApiProperty } from "@nestjs/swagger"

export class DanhSachVe {
    @ApiProperty()
    maLichChieu: number
    @ApiProperty()
    maGhe: number
}

export class LichChieuDto {
    @ApiProperty()
    maRap: number
    @ApiProperty()
    maPhim: number
    @ApiProperty()
    ngayGioChieu: string
    @ApiProperty()
    giaVe: number
}