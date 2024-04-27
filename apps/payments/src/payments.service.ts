import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from 'apps/payments/src/dto/payments-create-charge.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy
  ){}

  private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
    apiVersion: '2024-04-10'
  })

  async createCharge({card, amount, email}: PaymentsCreateChargeDto) {
    //@TODO - figure out how to create token from  card info
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: 'tok_mastercard'
      }
    })

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd'
    })

    this.notificationsService.emit('notify_email', { email })

    return paymentIntent
  }
}
