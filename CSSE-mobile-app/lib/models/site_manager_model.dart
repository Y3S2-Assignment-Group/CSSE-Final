class SiteManager {
  String token;

  SiteManager({
    required this.token,
  });

  factory SiteManager.fromJson(Map<String, dynamic> json) {
    return SiteManager(
      token: json['token'],
    );
  }
}
