class Site {
  String id;
  String siteName;

  Site({
    required this.id,
    required this.siteName,
  });

  factory Site.fromJson(Map<String, dynamic> json) {
    return Site(
      id: json['_id'],
      siteName: json['siteName'],
    );
  }
}
