import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { LocationDto, LocationUpdateDto } from 'src/lib/dtos/location.dto';
import { ProfileDto } from 'src/lib/dtos/profile.dto';
import { customeRequest } from 'src/lib/interfaces';
import { UserService } from './user.service';

@Controller(`user`)
export class UserController {
  constructor(private userService: UserService) {}
  @Get(`profile`)
  async getProfile(@Req() request: customeRequest) {
    return this.userService.getProfile(request);
  }
  @Put(`profile`)
  async putProfile(
    @Body() Profile: ProfileDto,
    @Req() request: customeRequest,
  ) {
    return this.userService.putProfile(Profile, request);
  }

  @Get(`location`)
  async getLocations(@Req() request: customeRequest) {
    return this.userService.getLocations(request);
  }
  @Post(`location`)
  async postLocation(
    @Body() locationDto: LocationDto,
    @Req() request: customeRequest,
  ) {
    return this.userService.postLocation(request, locationDto);
  }
  @Put(`location/:locationId`)
  async putLocation(
    @Param('locationId') locationId: string,
    @Body() locationUpdateDto: LocationUpdateDto,
    @Req() request: customeRequest,
  ) {
    return this.userService.putLocation(locationId, locationUpdateDto, request);
  }
  @Delete(`location/:locationId`)
  async deleteLocation(
    @Param('locationId') locationId: string,
    @Req() request: customeRequest,
  ) {
    return this.userService.deleteLocation(locationId, request);
  }
  @Post(`like/:productId`)
  async postLike(
    @Param('locationId') locationId: string,
    @Req() request: customeRequest,
  ) {
    return this.userService.postLike(locationId, request);
  }
  @Delete(`like/:productId`)
  async deleteLike(
    @Param('locationId') locationId: string,
    @Req() request: customeRequest,
  ) {
    return this.userService.deleteLike(locationId, request);
  }
}
