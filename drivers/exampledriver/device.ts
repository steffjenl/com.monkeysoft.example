import Homey from 'homey';

class MyDevice extends Homey.Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    this.registerCapabilityListener("onoff", async (newValue, options) => {

      const oldValue = this.getCapabilityValue('onoff');
      this.homey.log('onoff.oldValue = ' + oldValue);
      this.homey.log('onoff.newValue = ' + newValue);
      this.setCapabilityValue('onoff', oldValue);

      await this.setOnOffValue(oldValue);
    });

    // set default value for onoff
    this.setCapabilityValue('onoff', false);
    this.log('MyDevice has been initialized');
  }

  async setOnOffValue(value : boolean) {
    this.homey.log('setOnOffValue.value = ' + value);
    this.setCapabilityValue('onoff', value);
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('MyDevice has been added');
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings: {}, newSettings: {}, changedKeys: [] }): Promise<string|void> {
    this.log('MyDevice settings where changed');
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name: string) {
    this.log('MyDevice was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('MyDevice has been deleted');
  }

}

module.exports = MyDevice;
