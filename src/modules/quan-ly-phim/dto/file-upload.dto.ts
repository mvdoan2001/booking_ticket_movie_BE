import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {
  @ApiProperty()
  tenPhim: string
  @ApiProperty()
  trailer: string
  @ApiProperty({ type: 'string', format: 'binary' })
  hinhAnh: any;
  @ApiProperty()
  moTa: string
  @ApiProperty()
  ngayKhoiChieu: Date
  @ApiProperty()
  danhGia: number
  @ApiProperty()
  hot: boolean
  @ApiProperty()
  dangChieu: boolean
  @ApiProperty()
  sapChieu: boolean
}
