import { CreateChargeDto } from "@app/common";
import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmpty, ValidateNested } from "class-validator";

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  //@IsString()
  //@IsNotEmpty()
  //userId: string;
 
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto
}
