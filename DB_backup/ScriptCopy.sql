USE [master]
GO
/****** Object:  Database [WarehouseSE]    Script Date: 05.02.2025 15:09:26 ******/
CREATE DATABASE [WarehouseSE]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'WarehouseSE', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.WAPRO\MSSQL\DATA\WarehouseSE.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'WarehouseSE_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.WAPRO\MSSQL\DATA\WarehouseSE_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [WarehouseSE] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [WarehouseSE].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [WarehouseSE] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [WarehouseSE] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [WarehouseSE] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [WarehouseSE] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [WarehouseSE] SET ARITHABORT OFF 
GO
ALTER DATABASE [WarehouseSE] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [WarehouseSE] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [WarehouseSE] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [WarehouseSE] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [WarehouseSE] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [WarehouseSE] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [WarehouseSE] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [WarehouseSE] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [WarehouseSE] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [WarehouseSE] SET  DISABLE_BROKER 
GO
ALTER DATABASE [WarehouseSE] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [WarehouseSE] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [WarehouseSE] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [WarehouseSE] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [WarehouseSE] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [WarehouseSE] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [WarehouseSE] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [WarehouseSE] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [WarehouseSE] SET  MULTI_USER 
GO
ALTER DATABASE [WarehouseSE] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [WarehouseSE] SET DB_CHAINING OFF 
GO
ALTER DATABASE [WarehouseSE] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [WarehouseSE] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [WarehouseSE] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [WarehouseSE] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [WarehouseSE] SET QUERY_STORE = OFF
GO
USE [WarehouseSE]
GO
/****** Object:  UserDefinedFunction [dbo].[UNIX_TIMESTAMP]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[UNIX_TIMESTAMP] (
@ctimestamp datetime
)
RETURNS integer
AS
BEGIN
  /* Function body */
  declare @return integer
   
  SELECT @return = DATEDIFF(SECOND,{d '1970-01-01'}, @ctimestamp)
   
  return @return
END
GO
/****** Object:  Table [dbo].[ItemProperties]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemProperties](
	[item_index] [int] NOT NULL,
	[property_id] [int] NOT NULL,
	[value] [varchar](255) NOT NULL,
	[deletion_date] [datetime] NULL,
 CONSTRAINT [PK_ItemProperties] PRIMARY KEY CLUSTERED 
(
	[item_index] ASC,
	[property_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemTypes]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemTypes](
	[item_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](255) NULL,
	[price] [decimal](10, 2) NULL,
	[restricted_level] [int] NOT NULL,
	[deletion_date] [datetime] NULL,
 CONSTRAINT [PK_ItemTypes] PRIMARY KEY CLUSTERED 
(
	[item_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Items]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items](
	[item_id] [int] NOT NULL,
	[location_id] [int] NOT NULL,
	[details] [varchar](255) NULL,
	[quantity] [decimal](10, 4) NOT NULL,
	[restricted_level] [int] NOT NULL,
	[deletion_date] [datetime] NULL,
	[item_index] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Items] PRIMARY KEY CLUSTERED 
(
	[item_index] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DataTypes]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DataTypes](
	[type_id] [int] IDENTITY(1,1) NOT NULL,
	[type] [varchar](50) NOT NULL,
 CONSTRAINT [PK_DataTypes] PRIMARY KEY CLUSTERED 
(
	[type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemTypeProperties]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemTypeProperties](
	[property_id] [int] IDENTITY(1,1) NOT NULL,
	[item_id] [int] NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](255) NULL,
	[type_id] [int] NOT NULL,
	[deletion_date] [datetime] NULL,
 CONSTRAINT [PK_ItemTypeProperties] PRIMARY KEY CLUSTERED 
(
	[property_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ItemsView]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ItemsView]
AS
SELECT dbo.ItemTypes.item_id, dbo.ItemTypes.name AS ItemName, dbo.ItemTypes.description AS ItemDescription, dbo.ItemTypes.price AS ItemPrice, dbo.ItemTypeProperties.property_id, dbo.ItemTypeProperties.name AS PropertyName, 
                  dbo.ItemTypeProperties.description AS PropertyDescription, dbo.DataTypes.type AS PropertyType, dbo.ItemProperties.value AS PropertyValue, dbo.Items.location_id, dbo.Items.item_index, dbo.Items.details AS EntryDetails, 
                  dbo.Items.quantity AS EntryQuantity, dbo.Items.restricted_level AS EntryRestrictedLevel
FROM     dbo.DataTypes INNER JOIN
                  dbo.ItemTypeProperties ON dbo.DataTypes.type_id = dbo.ItemTypeProperties.type_id RIGHT OUTER JOIN
                  dbo.ItemTypes ON dbo.ItemTypeProperties.item_id = dbo.ItemTypes.item_id LEFT OUTER JOIN
                  dbo.Items ON dbo.ItemTypes.item_id = dbo.Items.item_id LEFT OUTER JOIN
                  dbo.ItemProperties ON dbo.ItemTypeProperties.property_id = dbo.ItemProperties.property_id AND dbo.Items.item_index = dbo.ItemProperties.item_index
WHERE  (dbo.ItemTypes.deletion_date IS NULL) AND (dbo.ItemTypeProperties.deletion_date IS NULL) AND (dbo.Items.deletion_date IS NULL) AND (dbo.ItemProperties.deletion_date IS NULL)
GO
/****** Object:  Table [dbo].[LocationProperties]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LocationProperties](
	[property_id] [int] IDENTITY(1,1) NOT NULL,
	[location_id] [int] NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](255) NULL,
	[type_id] [int] NOT NULL,
	[value] [varchar](255) NOT NULL,
	[deletion_date] [datetime] NULL,
 CONSTRAINT [PK_LocationProperties] PRIMARY KEY CLUSTERED 
(
	[property_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Locations]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Locations](
	[location_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](255) NULL,
	[restricted_level] [int] NOT NULL,
	[deletion_date] [datetime] NULL,
 CONSTRAINT [PK_Locations] PRIMARY KEY CLUSTERED 
(
	[location_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[LocationsView]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[LocationsView]
AS
SELECT dbo.Locations.location_id, dbo.Locations.name AS LocationName, dbo.Locations.description AS LocationDescription, dbo.Locations.restricted_level AS LocationRestrictedLevel, dbo.LocationProperties.property_id, 
                  dbo.LocationProperties.name AS PropertyName, dbo.LocationProperties.description AS PropertyDescription, dbo.DataTypes.type AS PropertyType, dbo.LocationProperties.value AS PropertyValue
FROM     dbo.Locations INNER JOIN
                  dbo.LocationProperties ON dbo.Locations.location_id = dbo.LocationProperties.location_id INNER JOIN
                  dbo.DataTypes ON dbo.LocationProperties.type_id = dbo.DataTypes.type_id
WHERE  (dbo.Locations.deletion_date IS NULL) AND (dbo.LocationProperties.deletion_date IS NULL)
GO
/****** Object:  Table [dbo].[ComparisonItemTables]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ComparisonItemTables](
	[table_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ComparisonItemTables] PRIMARY KEY CLUSTERED 
(
	[table_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ComparisonLocationTables]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ComparisonLocationTables](
	[table_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ComparisonLocationTables] PRIMARY KEY CLUSTERED 
(
	[table_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemImages]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemImages](
	[image_id] [int] IDENTITY(1,1) NOT NULL,
	[item_index] [int] NOT NULL,
	[image] [varbinary](max) NOT NULL,
	[description] [varchar](255) NULL,
	[deletion_date] [datetime] NULL,
 CONSTRAINT [PK_ItemImages] PRIMARY KEY CLUSTERED 
(
	[image_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemNotifications]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemNotifications](
	[notification_id] [int] IDENTITY(1,1) NOT NULL,
	[item_index] [int] NOT NULL,
	[table_id] [int] NOT NULL,
	[property] [varchar](50) NOT NULL,
	[comparison_type] [int] NOT NULL,
	[value] [varchar](255) NOT NULL,
	[value_type] [varchar](50) NOT NULL,
	[restricted_level] [int] NOT NULL,
	[deletion_date] [datetime] NULL,
 CONSTRAINT [PK_ItemNotifications] PRIMARY KEY CLUSTERED 
(
	[notification_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemNotificationSubscribers]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemNotificationSubscribers](
	[user_id] [int] NOT NULL,
	[notification_id] [int] NOT NULL,
	[phone] [bit] NOT NULL,
	[email] [bit] NOT NULL,
 CONSTRAINT [PK_ItemNotificationSubscribers] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[notification_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LocationImages]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LocationImages](
	[image_id] [int] IDENTITY(1,1) NOT NULL,
	[location_id] [int] NOT NULL,
	[image] [varbinary](max) NOT NULL,
	[description] [varchar](255) NULL,
	[deletion_date] [datetime] NULL,
 CONSTRAINT [PK_LocationImages] PRIMARY KEY CLUSTERED 
(
	[image_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LocationNotifications]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LocationNotifications](
	[notification_id] [int] IDENTITY(1,1) NOT NULL,
	[location_id] [int] NOT NULL,
	[table_id] [int] NOT NULL,
	[property] [varchar](50) NOT NULL,
	[comparison_type] [int] NOT NULL,
	[value] [varchar](255) NOT NULL,
	[value_type] [varchar](50) NOT NULL,
	[restricted_level] [int] NOT NULL,
	[deletion_date] [datetime] NULL,
 CONSTRAINT [PK_LocationNotifications] PRIMARY KEY CLUSTERED 
(
	[notification_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LocationNotificationSubscribers]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LocationNotificationSubscribers](
	[user_id] [int] NOT NULL,
	[notification_id] [int] NOT NULL,
	[phone] [bit] NOT NULL,
	[email] [bit] NOT NULL,
 CONSTRAINT [PK_LocationNotificationSubscribers] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[notification_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permissions](
	[permission_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Permissions] PRIMARY KEY CLUSTERED 
(
	[permission_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserPermissions]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserPermissions](
	[user_id] [int] NOT NULL,
	[permission_id] [int] NOT NULL,
 CONSTRAINT [PK_UserPermissions] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[permission_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 05.02.2025 15:09:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](max) NOT NULL,
	[phone] [varchar](20) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[permission_level] [int] NOT NULL,
	[deletion_date] [datetime] NULL,
	[boss_id] [int] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ComparisonItemTables] ON 

INSERT [dbo].[ComparisonItemTables] ([table_id], [name]) VALUES (1, N'Items')
INSERT [dbo].[ComparisonItemTables] ([table_id], [name]) VALUES (2, N'ItemProperties')
SET IDENTITY_INSERT [dbo].[ComparisonItemTables] OFF
GO
SET IDENTITY_INSERT [dbo].[ComparisonLocationTables] ON 

INSERT [dbo].[ComparisonLocationTables] ([table_id], [name]) VALUES (1, N'Locations')
INSERT [dbo].[ComparisonLocationTables] ([table_id], [name]) VALUES (2, N'LocationProperties')
SET IDENTITY_INSERT [dbo].[ComparisonLocationTables] OFF
GO
SET IDENTITY_INSERT [dbo].[DataTypes] ON 

INSERT [dbo].[DataTypes] ([type_id], [type]) VALUES (1, N'int')
INSERT [dbo].[DataTypes] ([type_id], [type]) VALUES (2, N'string')
INSERT [dbo].[DataTypes] ([type_id], [type]) VALUES (3, N'datetime')
INSERT [dbo].[DataTypes] ([type_id], [type]) VALUES (4, N'decimal')
SET IDENTITY_INSERT [dbo].[DataTypes] OFF
GO
INSERT [dbo].[ItemProperties] ([item_index], [property_id], [value], [deletion_date]) VALUES (1, 1, N'1770198944', NULL)
GO
SET IDENTITY_INSERT [dbo].[Items] ON 

INSERT [dbo].[Items] ([item_id], [location_id], [details], [quantity], [restricted_level], [deletion_date], [item_index]) VALUES (1, 1, N'The first batch of test items', CAST(50.0000 AS Decimal(10, 4)), 0, NULL, 1)
SET IDENTITY_INSERT [dbo].[Items] OFF
GO
SET IDENTITY_INSERT [dbo].[ItemTypeProperties] ON 

INSERT [dbo].[ItemTypeProperties] ([property_id], [item_id], [name], [description], [type_id], [deletion_date]) VALUES (1, 1, N'Expiration Date', N'The date of exripation for the product', 3, NULL)
INSERT [dbo].[ItemTypeProperties] ([property_id], [item_id], [name], [description], [type_id], [deletion_date]) VALUES (2, 1, N'Weight', N'How heavy the item is', 4, NULL)
SET IDENTITY_INSERT [dbo].[ItemTypeProperties] OFF
GO
SET IDENTITY_INSERT [dbo].[ItemTypes] ON 

INSERT [dbo].[ItemTypes] ([item_id], [name], [description], [price], [restricted_level], [deletion_date]) VALUES (1, N'Test Item', N'Simple Test Item', CAST(10.00 AS Decimal(10, 2)), 0, NULL)
SET IDENTITY_INSERT [dbo].[ItemTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[Locations] ON 

INSERT [dbo].[Locations] ([location_id], [name], [description], [restricted_level], [deletion_date]) VALUES (1, N'Test Location', N'Simple Test Storage', 0, NULL)
SET IDENTITY_INSERT [dbo].[Locations] OFF
GO
SET IDENTITY_INSERT [dbo].[Permissions] ON 

INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (1, N'Create Item Types')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (2, N'Edit Item Types')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (3, N'Delete Item Types')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (4, N'Add Items')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (5, N'Edit Items')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (6, N'Delete Items')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (7, N'Create Locations')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (8, N'Edit Locations')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (9, N'Delete Locations')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (10, N'Create Users')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (11, N'Edit Users')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (12, N'Delete Users')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (13, N'Create Notifications')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (14, N'Edit Notifications')
INSERT [dbo].[Permissions] ([permission_id], [name]) VALUES (15, N'Delete Notifications')
SET IDENTITY_INSERT [dbo].[Permissions] OFF
GO
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 1)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 2)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 3)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 4)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 5)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 6)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 7)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 8)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 9)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 10)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 11)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 12)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 13)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 14)
INSERT [dbo].[UserPermissions] ([user_id], [permission_id]) VALUES (1, 15)
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([user_id], [username], [password], [phone], [email], [permission_level], [deletion_date], [boss_id]) VALUES (1, N'admin', N'admin', N'535344039', N'jmoszynka@gmail.com', 0, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [Username_uniq]    Script Date: 05.02.2025 15:09:26 ******/
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [Username_uniq] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ItemImages]  WITH CHECK ADD  CONSTRAINT [FK_ItemImages_Item] FOREIGN KEY([item_index])
REFERENCES [dbo].[Items] ([item_index])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItemImages] CHECK CONSTRAINT [FK_ItemImages_Item]
GO
ALTER TABLE [dbo].[ItemNotifications]  WITH CHECK ADD  CONSTRAINT [FK_ItemNotifications_Item] FOREIGN KEY([item_index])
REFERENCES [dbo].[Items] ([item_index])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItemNotifications] CHECK CONSTRAINT [FK_ItemNotifications_Item]
GO
ALTER TABLE [dbo].[ItemNotifications]  WITH CHECK ADD  CONSTRAINT [FK_ItemNotifications_Table] FOREIGN KEY([table_id])
REFERENCES [dbo].[ComparisonItemTables] ([table_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItemNotifications] CHECK CONSTRAINT [FK_ItemNotifications_Table]
GO
ALTER TABLE [dbo].[ItemNotificationSubscribers]  WITH CHECK ADD  CONSTRAINT [FK_ItemNotificationSubscribers_Notification] FOREIGN KEY([notification_id])
REFERENCES [dbo].[ItemNotifications] ([notification_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItemNotificationSubscribers] CHECK CONSTRAINT [FK_ItemNotificationSubscribers_Notification]
GO
ALTER TABLE [dbo].[ItemNotificationSubscribers]  WITH CHECK ADD  CONSTRAINT [FK_ItemNotificationSubscribers_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItemNotificationSubscribers] CHECK CONSTRAINT [FK_ItemNotificationSubscribers_User]
GO
ALTER TABLE [dbo].[ItemProperties]  WITH CHECK ADD  CONSTRAINT [FK_ItemProperties_Item] FOREIGN KEY([item_index])
REFERENCES [dbo].[Items] ([item_index])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItemProperties] CHECK CONSTRAINT [FK_ItemProperties_Item]
GO
ALTER TABLE [dbo].[ItemProperties]  WITH CHECK ADD  CONSTRAINT [FK_ItemProperties_Property] FOREIGN KEY([property_id])
REFERENCES [dbo].[ItemTypeProperties] ([property_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItemProperties] CHECK CONSTRAINT [FK_ItemProperties_Property]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_ItemType] FOREIGN KEY([item_id])
REFERENCES [dbo].[ItemTypes] ([item_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_ItemType]
GO
ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[Locations] ([location_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Items] CHECK CONSTRAINT [FK_Items_Location]
GO
ALTER TABLE [dbo].[ItemTypeProperties]  WITH CHECK ADD  CONSTRAINT [FK_ItemTypeProperties_Item] FOREIGN KEY([item_id])
REFERENCES [dbo].[ItemTypes] ([item_id])
GO
ALTER TABLE [dbo].[ItemTypeProperties] CHECK CONSTRAINT [FK_ItemTypeProperties_Item]
GO
ALTER TABLE [dbo].[ItemTypeProperties]  WITH CHECK ADD  CONSTRAINT [FK_ItemTypeProperties_Type] FOREIGN KEY([type_id])
REFERENCES [dbo].[DataTypes] ([type_id])
GO
ALTER TABLE [dbo].[ItemTypeProperties] CHECK CONSTRAINT [FK_ItemTypeProperties_Type]
GO
ALTER TABLE [dbo].[LocationImages]  WITH CHECK ADD  CONSTRAINT [FK_LocationImages_Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[Locations] ([location_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LocationImages] CHECK CONSTRAINT [FK_LocationImages_Location]
GO
ALTER TABLE [dbo].[LocationNotifications]  WITH CHECK ADD  CONSTRAINT [FK_LocationNotifications_Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[Locations] ([location_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LocationNotifications] CHECK CONSTRAINT [FK_LocationNotifications_Location]
GO
ALTER TABLE [dbo].[LocationNotifications]  WITH CHECK ADD  CONSTRAINT [FK_LocationNotifications_Table] FOREIGN KEY([table_id])
REFERENCES [dbo].[ComparisonLocationTables] ([table_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LocationNotifications] CHECK CONSTRAINT [FK_LocationNotifications_Table]
GO
ALTER TABLE [dbo].[LocationNotificationSubscribers]  WITH CHECK ADD  CONSTRAINT [FK_LocationNotificationSubscribers_Notification] FOREIGN KEY([notification_id])
REFERENCES [dbo].[LocationNotifications] ([notification_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LocationNotificationSubscribers] CHECK CONSTRAINT [FK_LocationNotificationSubscribers_Notification]
GO
ALTER TABLE [dbo].[LocationNotificationSubscribers]  WITH CHECK ADD  CONSTRAINT [FK_LocationNotificationSubscribers_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LocationNotificationSubscribers] CHECK CONSTRAINT [FK_LocationNotificationSubscribers_User]
GO
ALTER TABLE [dbo].[LocationProperties]  WITH CHECK ADD  CONSTRAINT [FK_LocationProperties_Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[Locations] ([location_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LocationProperties] CHECK CONSTRAINT [FK_LocationProperties_Location]
GO
ALTER TABLE [dbo].[LocationProperties]  WITH CHECK ADD  CONSTRAINT [FK_LocationProperties_Type] FOREIGN KEY([type_id])
REFERENCES [dbo].[DataTypes] ([type_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LocationProperties] CHECK CONSTRAINT [FK_LocationProperties_Type]
GO
ALTER TABLE [dbo].[UserPermissions]  WITH CHECK ADD  CONSTRAINT [FK_UserPermissions_Permission] FOREIGN KEY([permission_id])
REFERENCES [dbo].[Permissions] ([permission_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserPermissions] CHECK CONSTRAINT [FK_UserPermissions_Permission]
GO
ALTER TABLE [dbo].[UserPermissions]  WITH CHECK ADD  CONSTRAINT [FK_UserPermissions_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserPermissions] CHECK CONSTRAINT [FK_UserPermissions_User]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Boss] FOREIGN KEY([boss_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Boss]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[58] 4[3] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "ItemTypes"
            Begin Extent = 
               Top = 7
               Left = 48
               Bottom = 170
               Right = 242
            End
            DisplayFlags = 280
            TopColumn = 2
         End
         Begin Table = "ItemTypeProperties"
            Begin Extent = 
               Top = 139
               Left = 300
               Bottom = 364
               Right = 494
            End
            DisplayFlags = 280
            TopColumn = 2
         End
         Begin Table = "Items"
            Begin Extent = 
               Top = 9
               Left = 949
               Bottom = 213
               Right = 1144
            End
            DisplayFlags = 280
            TopColumn = 3
         End
         Begin Table = "ItemProperties"
            Begin Extent = 
               Top = 59
               Left = 616
               Bottom = 238
               Right = 810
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "DataTypes"
            Begin Extent = 
               Top = 296
               Left = 596
               Bottom = 415
               Right = 790
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1176
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1356
         SortOrder = 1416
         GroupBy = 1350
         Filter = 1356
         Or = 1350
         Or = 135' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ItemsView'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'0
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ItemsView'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ItemsView'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Locations"
            Begin Extent = 
               Top = 7
               Left = 48
               Bottom = 263
               Right = 444
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "LocationProperties"
            Begin Extent = 
               Top = 12
               Left = 523
               Bottom = 305
               Right = 977
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "DataTypes"
            Begin Extent = 
               Top = 7
               Left = 1025
               Bottom = 126
               Right = 1219
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1176
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1356
         SortOrder = 1416
         GroupBy = 1350
         Filter = 1356
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'LocationsView'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'LocationsView'
GO
USE [master]
GO
ALTER DATABASE [WarehouseSE] SET  READ_WRITE 
GO
