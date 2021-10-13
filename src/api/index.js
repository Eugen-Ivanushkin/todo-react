export default class ApiService {
  _apiBase = "https://shop-fish2.herokuapp.com";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`); //

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getSettings() {
    const settings = await this.getResource("/settings/");
    return settings;
  }

  async getGoods(goodsGroup) {
    const goods = await this.getResource(`/goods?${goodsGroup}`);
    return goods;
  }

  async getPresentations() {
    const presentations = await this.getResource("/presentations/");
    return presentations;
  }

  async getPhotos(goodId) {
    const photos = await this.getResource(`/photos?_id=${goodId}`);
    return photos;
  }
}
