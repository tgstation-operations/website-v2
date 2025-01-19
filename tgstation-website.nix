{
  self,
  pkgs,
  lib,
  config,
  mkIf,
  ...
}:

let
  cfg = config.services.tgstation-website;
  package = pkgs.callPackage ./package.nix { };

in
{
  options = {
    services.tgstation-website = {
      username = lib.mkOption {
        type = lib.types.str;
        default = "tgstation-website";
        description = ''
          The username for the system user running tgstation-website.
        '';
      };

      port = lib.mkOption {
        type = lib.types.number;
        default = 12345;
        description = ''
          The port the container will be bound to.
        '';
      };

      cloudflared-token = lib.mkOption {
        type = lib.types.str;
        default = "NOTSET";
        description = ''
          The token used by cloudflared
        '';
      };

      api-key = lib.mkOption {
        type = lib.types.str;
        default = "NOTSET";
        description = ''
          The API key used by the server for privileged operations
        '';
      };
    };
  };

  config = {
    users.groups."${cfg.username}" = { };
    users.users."${cfg.username}" = {
      group = "${cfg.username}";
      isSystemUser = true;
    };

    systemd.services.tgstation-website = {
      description = "tgstation-website";
      serviceConfig = {
        User = cfg.username;
        WorkingDirectory = pkgs.fetchFromGitHub {
          owner = "tgstation-operations";
          repo = "website-v2";
          rev = "master";
          sha256 = "sha256:GDRABmvV2e9rYKl6b25Q/ONqgHuDzAfgPjPUND1FZA8=";
        };
        ExecStart = "${pkgs.docker}/bin/docker compose -f ./package/docker-compose.yml up --build";
        WantedBy = [ "multi-user.target" ];
        Environment = [
          "CLOUDFLARED_TOKEN=${cfg.cloudflared-token}"
          "API_KEY=${cfg.api-key}"
        ];
      };
    };
  };
}
