import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { customeRequest } from 'src/lib/interfaces';
import { prisma } from 'src/lib/clients/prisma';
import { ProfileDto } from 'src/lib/dtos/profile.dto';
import { LocationDto, LocationUpdateDto } from 'src/lib/dtos/location.dto';

@Injectable()
export class UserService {
  async getProfile(request: customeRequest) {
    try {
      const profile = await prisma.profile.findUnique({
        where: {
          userId: request.userId,
        },
      });
      return profile;
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async putProfile(Profile: ProfileDto, request: customeRequest) {
    try {
      const profile = await prisma.profile.update({
        where: {
          userId: request.userId,
        },
        data: Profile,
      });
      return profile;
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getLocations(request: customeRequest) {
    try {
      const profileId = await prisma.profile.findUnique({
        where: {
          userId: request.userId,
        },
        select: {
          id: true,
        },
      });
      const locations = await prisma.location.findMany({
        where: {
          profileId: profileId.id,
        },
      });
      return locations;
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async postLocation(request: customeRequest, locationDto: LocationDto) {
    try {
      const profileId = await prisma.profile.findUnique({
        where: {
          userId: request.userId,
        },
        select: {
          id: true,
        },
      });
      const location = await prisma.location.create({
        data: {
          ...locationDto,
          profileId: profileId.id,
        },
      });
      return location;
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async putLocation(
    locationId: string,
    locationUpdateDto: LocationUpdateDto,
    request: customeRequest,
  ) {
    try {
      const profile = await prisma.profile.findFirst({
        where: {
          userId: request.userId,
        },
      });
      const location = await prisma.location.update({
        where: {
          id: locationId,
          profileId: profile.id,
        },
        data: locationUpdateDto,
      });
      return location;
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteLocation(locationId: string, request: customeRequest) {
    try {
      const profile = await prisma.profile.findFirst({
        where: {
          userId: request.userId,
        },
      });
      const location = await prisma.location.delete({
        where: {
          id: locationId,
          profileId: profile.id,
        },
      });
      return location;
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async postLike(productId: string, request: customeRequest) {
    try {
      return await prisma.like.create({
        data: {
          productId: productId,
          userId: request.userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteLike(productId: string, request: customeRequest) {
    try {
      return await prisma.like.delete({
        where: {
          productId: productId,
          userId: request.userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Somethun went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
