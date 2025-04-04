const axios = require('axios');

class ShippingService {
  constructor() {
    this.shiprocketToken = null;
    this.tokenExpiry = null;
  }

  async authenticate() {
    try {
      const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD
      });
      
      this.shiprocketToken = response.data.token;
      this.tokenExpiry = Date.now() + (24 * 60 * 60 * 1000); // Token valid for 24 hours
      return this.shiprocketToken;
    } catch (err) {
      throw new Error('Failed to authenticate with Shiprocket');
    }
  }

  async createOrder(orderData) {
    if (!this.shiprocketToken || Date.now() > this.tokenExpiry) {
      await this.authenticate();
    }

    try {
      const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderData, {
        headers: {
          'Authorization': `Bearer ${this.shiprocketToken}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error('Failed to create shipping order');
    }
  }

  async trackOrder(shipmentId) {
    if (!this.shiprocketToken || Date.now() > this.tokenExpiry) {
      await this.authenticate();
    }

    try {
      const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track?shipment_id=${shipmentId}`, {
        headers: {
          'Authorization': `Bearer ${this.shiprocketToken}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error('Failed to track shipment');
    }
  }
}

module.exports = new ShippingService();
