import { CanActivate } from '@nestjs/common';

export const mock_ForceGuardFail: CanActivate = {
  canActivate: () => {
    return false;
  },
};

export const mock_ForceGuardPass: CanActivate = {
  canActivate: () => {
    return true;
  },
};
