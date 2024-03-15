﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Tennis.Repository;

#nullable disable

namespace backend_c_.Migrations
{
    [DbContext(typeof(TennisContext))]
    [Migration("20240315150228_updateModelsNullability")]
    partial class updateModelsNullability
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Tennis.Models.Game", b =>
                {
                    b.Property<int>("GameId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GameId"));

                    b.Property<int>("PlayerAId")
                        .HasColumnType("int");

                    b.Property<int>("PlayerAScore")
                        .HasColumnType("int");

                    b.Property<int>("PlayerBId")
                        .HasColumnType("int");

                    b.Property<int>("PlayerBScore")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TournamentId")
                        .HasColumnType("int");

                    b.HasKey("GameId");

                    b.HasIndex("PlayerAId");

                    b.HasIndex("PlayerBId");

                    b.HasIndex("TournamentId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("Tennis.Models.Player", b =>
                {
                    b.Property<int>("PlayerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PlayerId"));

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("PlayerId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Players");
                });

            modelBuilder.Entity("Tennis.Models.PlayerTournament", b =>
                {
                    b.Property<int>("PlayerTournamentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PlayerTournamentId"));

                    b.Property<int>("PlayerId")
                        .HasColumnType("int");

                    b.Property<int>("TournamentId")
                        .HasColumnType("int");

                    b.HasKey("PlayerTournamentId");

                    b.HasIndex("PlayerId");

                    b.HasIndex("TournamentId");

                    b.ToTable("PlayerTournaments");
                });

            modelBuilder.Entity("Tennis.Models.Tournament", b =>
                {
                    b.Property<int>("TournamentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TournamentId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PrizeMoney")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TournamentId");

                    b.HasIndex("UserId");

                    b.ToTable("Tournaments");
                });

            modelBuilder.Entity("Tennis.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Tennis.Models.Game", b =>
                {
                    b.HasOne("Tennis.Models.Player", "PlayerA")
                        .WithMany("GamesPlayerA")
                        .HasForeignKey("PlayerAId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Tennis.Models.Player", "PlayerB")
                        .WithMany("GamesPlayerB")
                        .HasForeignKey("PlayerBId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Tennis.Models.Tournament", "Tournament")
                        .WithMany("Games")
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PlayerA");

                    b.Navigation("PlayerB");

                    b.Navigation("Tournament");
                });

            modelBuilder.Entity("Tennis.Models.Player", b =>
                {
                    b.HasOne("Tennis.Models.User", "User")
                        .WithOne("Player")
                        .HasForeignKey("Tennis.Models.Player", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Tennis.Models.PlayerTournament", b =>
                {
                    b.HasOne("Tennis.Models.Player", "Player")
                        .WithMany("PlayerTournaments")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Tennis.Models.Tournament", "Tournament")
                        .WithMany("PlayerTournaments")
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Player");

                    b.Navigation("Tournament");
                });

            modelBuilder.Entity("Tennis.Models.Tournament", b =>
                {
                    b.HasOne("Tennis.Models.User", "User")
                        .WithMany("Tournaments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Tennis.Models.Player", b =>
                {
                    b.Navigation("GamesPlayerA");

                    b.Navigation("GamesPlayerB");

                    b.Navigation("PlayerTournaments");
                });

            modelBuilder.Entity("Tennis.Models.Tournament", b =>
                {
                    b.Navigation("Games");

                    b.Navigation("PlayerTournaments");
                });

            modelBuilder.Entity("Tennis.Models.User", b =>
                {
                    b.Navigation("Player");

                    b.Navigation("Tournaments");
                });
#pragma warning restore 612, 618
        }
    }
}
